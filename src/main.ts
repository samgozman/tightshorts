import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import express, { Request, Response, NextFunction } from 'express';
import { create } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import fs from 'fs';
import http from 'http';
import https from 'https';
import csurf from 'csurf';
import helmet from 'helmet';
import { SentryService } from '@ntegral/nestjs-sentry';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { isURL } from 'class-validator';
import { ApiConnectService } from './modules/api/api-connect.service';

async function bootstrap() {
	const server = express();
	const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));
	const sentryService = app.get<SentryService>(SentryService);
	const config = app.get<ConfigService>(ConfigService);
	const apiConnectService = app.get<ApiConnectService>(ApiConnectService);

	// Sets API_KEY env
	await apiConnectService.call();

	// Set Handlebars
	const hbs = create({
		extname: 'hbs',
		partialsDir: join(__dirname, '/../web/views/partials'),
		layoutsDir: join(__dirname, '/../web/views/layouts'),
	});

	app.setBaseViewsDir(join(__dirname, '/../web/views'));

	// Set Sentry for Express
	app.use(sentryService.instance().Handlers.requestHandler());
	app.use(sentryService.instance().Handlers.tracingHandler());

	app.use(express.static(join(__dirname, '/../dist')));
	app.engine('.hbs', hbs.engine);
	app.setViewEngine('hbs');

	// Set cookie
	app.use(cookieParser(config.get('COOKIE_KEY')));
	app.use(
		cookieSession({
			secret: config.get('COOKIE_SESSION_KEY'),
		}),
	);

	// Security
	app.use(
		helmet({
			contentSecurityPolicy: false,
		}),
	);

	await app.init();

	await app.listen(config.get('PORT'));

	// Setup HTTPS connection for production server
	// if (config.get('NODE_ENV') === 'production') {
	// 	// https settings
	// 	const httpsOptions: HttpsOptions = {
	// 		key: fs.readFileSync('/etc/letsencrypt/live/tightshorts.ru/privkey.pem'),
	// 		cert: fs.readFileSync('/etc/letsencrypt/live/tightshorts.ru/cert.pem'),
	// 		ca: fs.readFileSync('/etc/letsencrypt/live/tightshorts.ru/chain.pem'),
	// 	};

	// 	// HTTPS server
	// 	https.createServer(httpsOptions, server).listen(443);

	// 	// Redirect from 80 to 443
	// 	http
	// 		.createServer(function (req, res) {
	// 			const link = 'https://' + req.headers['host'] + req.url;
	// 			if (isURL(link)) {
	// 				res.writeHead(301, {
	// 					Location: link,
	// 				});
	// 				res.end();
	// 			}
	// 		})
	// 		.listen(80);
	// } else {
	// 	// http dev server
	// 	http.createServer(server).listen(config.get('PORT'));
	// }
}
bootstrap();
