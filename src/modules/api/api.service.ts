import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { StockDto } from './dtos/stock.dto';
import { GetFilteredDto } from './dtos/get-filtered.dto';
import { FilteredStocksDto } from './dtos/filtered-stocks.dto';

@Injectable()
export class ApiService {
	constructor(private readonly configService: ConfigService) {}

	async getQuote(ticker: string): Promise<StockDto> {
		try {
			const config: AxiosRequestConfig = {
				method: 'get',
				url: `${this.configService.get('API_URL')}/stock?ticker=${ticker}`,
				headers: {
					token: this.configService.get('API_KEY'),
					'Content-Type': 'application/json',
				},
			};
			const { data }: { data: StockDto } = await axios(config);
			return data;
		} catch (error) {
			throw new NotFoundException();
		}
	}

	async getFiltered(getFilteredDto: GetFilteredDto): Promise<FilteredStocksDto> {
		try {
			const config: AxiosRequestConfig = {
				method: 'get',
				url: `${this.configService.get('API_URL')}/filter`,
				params: {
					// Remove all empty keys from DTO
					// ! Fix
					...Object.entries(getFilteredDto).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {}),
				},
				headers: {
					token: this.configService.get('API_KEY'),
					'Content-Type': 'application/json',
				},
			};
			const { data }: { data: FilteredStocksDto } = await axios(config);
			return data;
		} catch (error) {
			throw new BadRequestException(error.response.data.message);
		}
	}
}
