import { Test } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

describe('ApiController', () => {
	let apiController: ApiController;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [], // Add
			controllers: [], // Add
			providers: [
				ApiController,
				{ provide: ApiService, useValue: { getQuote: () => '', getFiltered: () => '' } },
			], // Add
		}).compile();

		apiController = moduleRef.get<ApiController>(ApiController);
	});

	it('should be defined', () => {
		expect(apiController).toBeDefined();
	});

	it('getQuoteApi: should be defined', () => {
		expect(apiController.getQuoteApi({ ticker: 'AAPL' })).toBeDefined();
	});

	it('getFilteredApi: should be defined', () => {
		expect(apiController.getFilteredApi({})).toBeDefined();
	});
});
