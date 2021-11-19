import { ApiModule } from './modules/api/api.module';
import { ScreenerModule } from './modules/screener/screener.module';
import { QuoteModule } from './modules/quote/quote.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { AppController } from './app.controller';
import { APP_PIPE } from '@nestjs/core';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { LogLevel } from '@sentry/types';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `config/.${process.env.NODE_ENV}.env`,
			validationSchema: process.env.NODE_ENV !== 'github' ? configValidationSchema : undefined,
		}),
		SentryModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				dsn: config.get('SENTRY_DSN'),
				debug: true,
				environment: process.env.NODE_ENV,
				release: process.env.npm_package_version,
				logLevel: LogLevel.Debug,
				tracesSampleRate: config.get('SENTRY_TRACE_RATE'),
				// Do not capture traces for frontend files
				tracesSampler: (samplingContext) => {
					const { name } = samplingContext.transactionContext;
					const regex: RegExp = /(\.ico)|(\.js)|(\.css)|(\.html)|(\.png)|(\.gif)|(\.jpg)|(\.jpeg)/g;
					if (regex.test(name)) {
						// Drop this transaction, by setting its sample rate to 0%
						return 0;
					} else {
						return config.get('SENTRY_TRACE_RATE');
					}
				},
			}),
		}),
		ApiModule,
		ScreenerModule,
		QuoteModule,
	],
	controllers: [AppController],
	providers: [
		// Apply this pipe on any request that flows into the application (instead of main.ts file)
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				// Enable transformation in validation process
				transform: true,
				// Check that incoming request don't have unexpected keys (removes them)
				whitelist: true,
				// Throw an error on forbiden request
				forbidNonWhitelisted: true,
			}),
		},
	],
})
export class AppModule {}
