import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
	constructor(private readonly quoteService: QuoteService) {}

	@Get(':ticker')
	getQuote(@Res() res: Response, @Req() req: Request, @Param('ticker') ticker: string) {
		// this.quoteService.getQuote();
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
