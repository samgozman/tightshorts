import { Expose } from 'class-transformer';

export class UserApiDto {
	@Expose()
	apikey: string;
}
