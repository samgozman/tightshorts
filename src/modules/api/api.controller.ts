import { Controller, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiService } from './api.service';
import { GetFilteredDto } from './dtos/get-filtered.dto';
import { GetQuoteDto } from './dtos/get-quote.dto';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';

@Controller('api')
@UseInterceptors(new SentryInterceptor())
export class ApiController {
	constructor(private readonly apiService: ApiService) {}

	@Post('quote')
	getQuoteApi(@Query() query: GetQuoteDto) {
		const { ticker } = query;
		return this.apiService.getQuote(ticker);
	}

	@Post('filter')
	getFilteredApi(@Query() query: GetFilteredDto) {
		return this.apiService.getFiltered(query);
	}
}
