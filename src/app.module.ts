import { ApiModule } from './modules/api/api.module';
import { ScreenerModule } from './modules/screener/screener.module';
import { QuoteModule } from './modules/quote/quote.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { AppController } from './app.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `config/.${process.env.NODE_ENV}.env`,
			validationSchema: process.env.NODE_ENV !== 'github' ? configValidationSchema : undefined,
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
