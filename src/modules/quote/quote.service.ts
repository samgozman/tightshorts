import { Injectable } from '@nestjs/common';

@Injectable()
export class QuoteService {
	getQuote() {
		return 'quote';
	}
}
