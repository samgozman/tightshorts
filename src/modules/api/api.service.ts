import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { StockDto } from './dtos/stock.dto';
import { GetFilteredDto } from './dtos/get-filtered.dto';
import { FilteredStocksDto } from './dtos/filtered-stocks.dto';
import { UserDto } from './dtos/user.dto';
import { UserApiDto } from './dtos/user-api.dto';

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

	/** Get current list of users for api-connect */
	async getUsers() {
		try {
			const config: AxiosRequestConfig = {
				method: 'get',
				url: `${this.configService.get('API_URL')}/user/list`,
				headers: {
					Authorization: `Bearer ${this.configService.get('ADMIN_SECRET')}`,
					'Content-Type': 'application/json',
				},
			};
			const { data }: { data: UserDto[] } = await axios(config);
			return data;
		} catch (error) {
			throw new BadRequestException(error.response.data.message);
		}
	}

	/** Add roles to user for api-connect */
	async addRolesToUser(login: string, role: string) {
		try {
			const config: AxiosRequestConfig = {
				method: 'patch',
				url: `${this.configService.get('API_URL')}/user/roles`,
				data: {
					login,
					role,
				},
				headers: {
					Authorization: `Bearer ${this.configService.get('ADMIN_SECRET')}`,
					'Content-Type': 'application/json',
				},
			};
			const { data }: { data: UserDto } = await axios(config);
			return data;
		} catch (error) {
			throw new BadRequestException(error.response.data.message);
		}
	}

	async createUser(login: string, pass = this.configService.get('API_USER_PASS')) {
		try {
			const config: AxiosRequestConfig = {
				method: 'post',
				url: `${this.configService.get('API_URL')}/auth/register`,
				data: {
					login,
					pass,
				},
				headers: {
					Authorization: `Bearer ${this.configService.get('ADMIN_SECRET')}`,
					'Content-Type': 'application/json',
				},
			};
			const { data }: { data: UserDto } = await axios(config);
			return data;
		} catch (error) {
			throw new BadRequestException(error.response.data.message);
		}
	}

	async getApiKey(login: string) {
		try {
			const config: AxiosRequestConfig = {
				method: 'post',
				url: `${this.configService.get('API_URL')}/user/api`,
				data: {
					login,
				},
				headers: {
					Authorization: `Bearer ${this.configService.get('ADMIN_SECRET')}`,
					'Content-Type': 'application/json',
				},
			};
			const { data }: { data: UserApiDto } = await axios(config);
			return data.apikey;
		} catch (error) {
			throw new BadRequestException(error.response.data.message);
		}
	}
}
