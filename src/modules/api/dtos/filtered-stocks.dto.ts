import { Expose } from 'class-transformer';

export class FilteredStocksDto {
	@Expose()
	count: number;

	@Expose()
	stocks: [];
}
