import { Injectable } from '@nestjs/common';

@Injectable()
export class ScreenerService {
	getScreener() {
		return 'screener';
	}
}
