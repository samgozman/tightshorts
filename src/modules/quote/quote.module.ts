import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { Module } from '@nestjs/common';

@Module({
	imports: [],
	controllers: [QuoteController],
	providers: [QuoteService],
})
export class QuoteModule {}
