import {config} from 'dotenv';


config({
	path: `.env.${process.env.NODE_ENV}`
});

const env: NodeJS.ProcessEnv = process.env;

const environment = Object.freeze({
	NODE_ENV : env['NODE_ENV'] || 'development',
	PORT: Number(env['PORT'] || 3000),
	LOG_DIR: env['LOG_DIR'] || 'logs',
	MONGO_URI: env['MONGO_URI'] || '',
	JWT_EXPIRE: env['JWT_EXPIRE'] || '10d',
	JWT_REFRESH_EXPIRE: env['JWT_REFRESH_EXPIRE'] || '100d'
});

export default environment;