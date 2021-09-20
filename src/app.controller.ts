import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHomePage(@Res() res: Response, @Req() req: Request) {
		// this.appService.getHome();
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
