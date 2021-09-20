import { Controller, Get } from '@nestjs/common';
import { ScreenerService } from './screener.service';

@Controller('screener')
export class ScreenerController {
	constructor(private readonly screenerService: ScreenerService) {}

	@Get()
	getScreener() {
		return this.screenerService.getScreener();
	}
}
