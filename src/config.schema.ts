import Joi from '@hapi/joi';

// *.env validation
export const configValidationSchema = Joi.object({
	PORT: Joi.number().default(3001).required(),
	API_URL: Joi.string().default('http://localhost:3000').required(),
	API_USER_LOGIN: Joi.string().optional().allow(null, ''),
	API_USER_PASS: Joi.string().optional().allow(null, ''),
	API_KEY: Joi.string().optional().allow(null, ''),
	ADMIN_SECRET: Joi.string().required(),
	COOKIE_KEY: Joi.string().required(),
	COOKIE_SESSION_KEY: Joi.string().required(),
	SENTRY_DSN: Joi.string().required().uri(),
	SENTRY_TRACE_RATE: Joi.number().required().default(1.0),
});
