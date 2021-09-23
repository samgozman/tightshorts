import { Test } from '@nestjs/testing';
import { QuoteController } from './quote.controller';

describe('QuoteController', () => {
	let quoteController: QuoteController;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [], // Add
			controllers: [], // Add
			providers: [QuoteController], // Add
		}).compile();

		quoteController = moduleRef.get<QuoteController>(QuoteController);
	});

	it('should be defined', () => {
		expect(quoteController).toBeDefined();
	});
});
