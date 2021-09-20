import Joi from '@hapi/joi';

// *.env validation
export const configValidationSchema = Joi.object({
	PORT: Joi.number().default(3001).required(),
	API_URL: Joi.string().default('http://localhost:3000').required(),
	API_KEY: Joi.string().required(),
	COOKIE_KEY: Joi.string().required(),
	COOKIE_SESSION_KEY: Joi.string().required(),
});
