// Initial API connection script
// Creates user with proper token and saves it

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiService } from './api.service';

@Injectable()
export class ApiConnectService {
	private login: string;
	private readonly roles = ['stockInfo', 'screener'];

	constructor(private readonly apiService: ApiService, private readonly configService: ConfigService) {
		this.login = this.configService.get('API_USER_LOGIN');
	}

	async call() {
		const users = await this.apiService.getUsers();
		let user = users.find((e) => e.login === this.login);

		if (user === undefined) {
			await this.apiService.createUser(this.login);
			user = { login: this.login, roles: [] };
		}

		const hasAccess = this.roles.every((e) => user.roles.includes(e));

		if (!hasAccess && user) {
			await this.apiService.addRolesToUser(this.login, this.roles[0]);
			await this.apiService.addRolesToUser(this.login, this.roles[1]);
		}

		process.env['API_KEY'] = await this.apiService.getApiKey(this.login);
	}
}
