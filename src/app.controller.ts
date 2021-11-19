import { Controller, Get, Req, Res, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';

@Controller()
@UseInterceptors(new SentryInterceptor())
export class AppController {
	@Get()
	getHomePage(@Res() res: Response, @Req() req: Request) {
		return res.render('index', {
			layout: 'tightshorts-ui',
			title: 'Tight Shorts',
			isMain: true,
			version: process.env.npm_package_version,
			ticker: 'undefined',
			csrf: req.csrfToken(),
		});
	}
}
