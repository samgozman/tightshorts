import { Controller, Get, Param, Req, Res, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';

@Controller('quote')
@UseInterceptors(new SentryInterceptor())
export class QuoteController {
	@Get(':ticker')
	getQuote(@Res() res: Response, @Req() req: Request, @Param('ticker') ticker: string) {
		return res.render('index', {
			layout: 'tightshorts-ui',
			title: 'Tight Shorts',
			isMain: true,
			version: process.env.npm_package_version,
			ticker: ticker,
		});
	}
}
