import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { Module } from '@nestjs/common';

@Module({
	imports: [],
	controllers: [ApiController],
	providers: [ApiService],
})
export class ApiModule {}
