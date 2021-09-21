import { IsOptional } from 'class-validator';

export class GetFilteredDto {
	@IsOptional()
	limit?: string;

	@IsOptional()
	skip?: string;

	@IsOptional()
	sortby?: string;

	@IsOptional()
	sortdir?: string;

	@IsOptional()
	filters?: string;
}
