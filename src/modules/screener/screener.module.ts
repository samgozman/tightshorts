import { ScreenerService } from './screener.service';
import { ScreenerController } from './screener.controller';
import { Module } from '@nestjs/common';

@Module({
	imports: [],
	controllers: [ScreenerController],
	providers: [ScreenerService],
})
export class ScreenerModule {}
