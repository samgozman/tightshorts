import { Expose } from 'class-transformer';

export class StockDto {
	@Expose()
	ticker: string;

	@Expose()
	shortVolRatioLast: number;

	@Expose()
	shortExemptVolRatioLast: number;

	@Expose()
	totalVolLast: number;

	@Expose()
	shortVolRatio5DAVG: number;

	@Expose()
	shortExemptVolRatio5DAVG: number;

	@Expose()
	totalVol5DAVG: number;

	@Expose()
	shortVolRatio20DAVG: number;

	@Expose()
	shortExemptVolRatio20DAVG: number;

	@Expose()
	totalVol20DAVG: number;

	@Expose()
	version: string;

	@Expose()
	volume: [];
}
