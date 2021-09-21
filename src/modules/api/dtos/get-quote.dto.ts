import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class GetQuoteDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(16)
	@Matches(/^([a-zA-Z0-9]\.?)+$/s, {
		message: 'ticker can only contain letters, numbers and a period.',
	})
	@Transform(({ value }) => value.toUpperCase())
	ticker: string;
}
