import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('quote')
export class QuoteController {
	@Get(':ticker')
	getQuote(@Res() res: Response, @Req() req: Request, @Param('ticker') ticker: string) {
		return res.render('index', {
			layout: 'tightshorts-ui',
			title: 'Tight Shorts',
			isMain: true,
			version: process.env.npm_package_version,
			ticker: ticker,
			csrf: req.csrfToken(),
		});
	}
}
