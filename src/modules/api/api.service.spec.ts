// ! NEED TO REPLACE IT WITH NEW TESTS
// ! NEW TEST MUST NOT BE USED TO ACCESS THE REAL SERVER

it('', () => {});

// import { BadRequestException, NotFoundException } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { Test } from '@nestjs/testing';
// import { ApiService } from './api.service';

// describe('ApiService', () => {
// 	let apiService: ApiService;

// 	beforeEach(async () => {
// 		const moduleRef = await Test.createTestingModule({
// 			imports: [
// 				ConfigModule.forRoot({
// 					envFilePath: `config/.${process.env.NODE_ENV}.env`,
// 				}),
// 			],
// 			controllers: [], // Add
// 			providers: [ApiService], // Add
// 		}).compile();

// 		apiService = moduleRef.get<ApiService>(ApiService);
// 	});

// 	it('should be defined', () => {
// 		expect(apiService).toBeDefined();
// 	});

// 	describe('getQuote', () => {
// 		it('should be defined', () => {
// 			expect(apiService.getQuote('MSFT')).toBeDefined();
// 		});

// 		it('should get quote', async () => {
// 			const stock = await apiService.getQuote('MSFT');
// 			expect(stock.ticker).toEqual('MSFT');
// 		});

// 		it('should get not found exception', async () => {
// 			await expect(apiService.getQuote('SHOULDFALL')).rejects.toBeInstanceOf(NotFoundException);
// 		});
// 	});

// 	describe('getFiltered', () => {
// 		it('should be defined', () => {
// 			expect(apiService.getFiltered({ limit: '5' })).toBeDefined();
// 		});

// 		it('should get filtered results', async () => {
// 			const filtered = await apiService.getFiltered({ limit: '5' });
// 			expect(filtered.stocks.length).toEqual(5);
// 		});

// 		it('should get bad request error', async () => {
// 			await expect(apiService.getFiltered({ limit: '-10' })).rejects.toBeInstanceOf(BadRequestException);
// 			await expect(apiService.getFiltered({ skip: '-10' })).rejects.toBeInstanceOf(BadRequestException);
// 			await expect(apiService.getFiltered({ sortby: 'somewhat' })).rejects.toBeInstanceOf(
// 				BadRequestException,
// 			);
// 			await expect(apiService.getFiltered({ sortdir: 'somehow' })).rejects.toBeInstanceOf(
// 				BadRequestException,
// 			);
// 		});
// 	});
// });
