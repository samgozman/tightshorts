import { ApiService } from './api.service';
import { ApiConnectService } from './api-connect.service';
import { ApiController } from './api.controller';
import { Module } from '@nestjs/common';

@Module({
	imports: [],
	controllers: [ApiController],
	providers: [ApiService, ApiConnectService],
})
export class ApiModule {}
