import { QuoteController } from './quote.controller';
import { Module } from '@nestjs/common';

@Module({
	imports: [],
	controllers: [QuoteController],
	providers: [],
})
export class QuoteModule {}
