import winston from 'winston';
// const path = require('path');
import { existsSync, mkdirSync } from 'fs';
import winstonDaily from 'winston-daily-rotate-file';
import environment from '../config/environment';


// logs dir
const logDir:string = environment.LOG_DIR;

if (!existsSync(logDir)) {
	mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
export const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		logFormat,
	),
	transports: [
		// debug log setting
		new winstonDaily({
			level: 'debug',
			datePattern: 'YYYY-MM-DD',
			dirname: logDir + '/debug', // log file /logs/debug/*.log in save
			filename: '%DATE%.log',
			maxFiles: 30, // 30 Days saved
			json: true,
			zippedArchive: true,
		}),
		// error log setting
		new winstonDaily({
			level: 'error',
			datePattern: 'YYYY-MM-DD',
			dirname: logDir + '/error', // log file /logs/error/*.log in save
			filename: '%DATE%.log',
			maxFiles: 30, // 30 Days saved
			handleExceptions: true,
			json: true,
			zippedArchive: true,
		}),
	],
});

logger.add(
	new winston.transports.Console({
		format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
	}),
);

export const stream = {
	write: (message:string) => {
		logger.info(message.substring(0, message.lastIndexOf('\n')));
	},
};

