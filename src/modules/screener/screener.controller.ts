import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('screener')
export class ScreenerController {
	@Get()
	getScreener(@Res() res: Response, @Req() req: Request) {
		return res.render('screener', {
			layout: 'screener-ui',
			isScreener: true,
			title: 'Tight Shorts: Screener',
			version: process.env.npm_package_version,
			csrf: req.csrfToken(),
			filters: {
				settings: {
					onTinkoff: {
						title: 'Available on Tinkoff broker',
						iconClass: 'extension-puzzle-outline',
					},
					isNotGarbage: {
						title: 'Is not complete garbage',
						iconClass: 'trash-bin-outline',
					},
				},
				sequence3D: {
					shortVol3D: {
						title: 'Short volume 3d',
						upId: 'shortVolGrows3D',
						downId: 'shortVolDecreases3D',
					},
					shortVolRatio3D: {
						title: 'Short volume %% 3d',
						upId: 'shortVolRatioGrows3D',
						downId: 'shortVoRatiolDecreases3D',
					},
					totalVol3D: {
						title: 'Total volume 3d',
						upId: 'totalVolGrows3D',
						downId: 'totalVolDecreases3D',
					},
					shortExemptVol3D: {
						title: 'Short exempt volume 3d',
						upId: 'shortExemptVolGrows3D',
						downId: 'shortExemptVolDecreases3D',
					},
					shortExemptVolRatio3D: {
						title: 'Short exempt volume %% 3d',
						upId: 'shortExemptVolRatioGrows3D',
						downId: 'shortExemptVolRatioDecreases3D',
					},
				},
				sequence5D: {
					shortVol5D: {
						title: 'Short volume 5d',
						upId: 'shortVolGrows5D',
						downId: 'shortVolDecreases5D',
					},
					shortVolRatio5D: {
						title: 'Short volume %% 5d',
						upId: 'shortVolRatioGrows5D',
						downId: 'shortVoRatiolDecreases5D',
					},
					totalVol5D: {
						title: 'Total volume 5d',
						upId: 'totalVolGrows5D',
						downId: 'totalVolDecreases5D',
					},
					shortExemptVol5D: {
						title: 'Short exempt volume 5d',
						upId: 'shortExemptVolGrows5D',
						downId: 'shortExemptVolDecreases5D',
					},
					shortExemptVolRatio5D: {
						title: 'Short exempt volume %% 5d',
						upId: 'shortExemptVolRatioGrows5D',
						downId: 'shortExemptVolRatioDecreases5D',
					},
				},
				abnormal: {
					abnormalShortlVol: {
						title: 'x3 short volume',
						upId: 'abnormalShortlVolGrows',
						downId: 'abnormalShortVolDecreases',
					},
					abnormalTotalVol: {
						title: 'x3 total volume',
						upId: 'abnormalTotalVolGrows',
						downId: 'abnormalTotalVolDecreases',
					},
					abnormalShortExemptVol: {
						title: 'x3 short exempt volume',
						upId: 'abnormalShortExemptVolGrows',
						downId: 'abnormalShortExemptVolDecreases',
					},
				},
			},
		});
	}
}
