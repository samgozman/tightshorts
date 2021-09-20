import { ScreenerModule } from './modules/screener/screener.module';
import { QuoteModule } from './modules/quote/quote.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `config/.${process.env.NODE_ENV}.env`,
			validationSchema:
				process.env.NODE_ENV !== 'github' ? configValidationSchema : undefined,
		}),
		ScreenerModule,
		QuoteModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
