import { Test } from '@nestjs/testing';
import { ScreenerController } from './screener.controller';

describe('ScreenerController', () => {
	let screenerController: ScreenerController;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [], // Add
			controllers: [], // Add
			providers: [ScreenerController], // Add
		}).compile();

		screenerController = moduleRef.get<ScreenerController>(ScreenerController);
	});

	it('should be defined', () => {
		expect(screenerController).toBeDefined();
	});
});
