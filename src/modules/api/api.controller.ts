import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { ApiService } from './api.service';
import { GetFilteredDto } from './dtos/get-filtered.dto';
import { GetQuoteDto } from './dtos/get-quote.dto';

@Controller('api')
export class ApiController {
	constructor(private readonly apiService: ApiService) {}

	@Post('quote')
	getQuoteApi(@Body() getQuoteDto: GetQuoteDto) {
		const { ticker } = getQuoteDto;
		return this.apiService.getQuote(ticker);
	}

	@Post('filter')
	getFilteredApi(@Query() getFilteredDto: GetFilteredDto) {
		return this.apiService.getFiltered(getFilteredDto);
	}
}
