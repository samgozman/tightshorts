import { ScreenerModule } from './modules/screener/screener.module';
import { QuoteModule } from './modules/quote/quote.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [ScreenerModule, QuoteModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
