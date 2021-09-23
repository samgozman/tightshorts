import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller()
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
