import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = app.get<ConfigService>(ConfigService).get('PORT');

	// Set cookie

	// Block csrf

	// Security
	app.use(
		helmet({
			contentSecurityPolicy: false,
		}),
	);

	await app.listen(port);
}
bootstrap();
