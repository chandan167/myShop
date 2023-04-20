import express, { Application, NextFunction, Request, Response } from 'express';
import { NotFound, HttpError } from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';

import environment from './config/environment';
import { logger } from './utils/logger';
import { router } from './routes/router';
import { StatusCodes } from 'http-status-codes';

export default class Server {

	private app: Application;
	private port: number = environment.PORT;
	private node_env: string = environment.NODE_ENV;

	constructor() {
		this.app = express();
		this.registerMiddleware();
		this.registerRoute();
		this.throwNotFoundError();
		this.handleExceptions();
	}

	private registerMiddleware() {
		this.app.use(express.json()).use(express.urlencoded({ extended: true })).use(morgan('dev')).use(cors());
	}

	private registerRoute() {
		this.app.use(router);
	}

	private throwNotFoundError() {
		this.app.use((_req: Request, _res: Response, next: NextFunction) => {
			next(new NotFound('Route not found'));
		});
	}

	private handleExceptions() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		this.app.use((err: Error | any, _req: Request, res: Response, _next: NextFunction) => {
			if (err instanceof HttpError) {
				return res.status(err.status).json({ message: err.message });
			}
			if (this.node_env === 'development') {
				return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
					message: err.message,
					stack: err.stack
				});
			}

			logger.error([err.message,  err.stack]);
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong please try after sometime' });
		});
	}

	listen() {
		this.app.listen(this.port, () => {
			logger.info('=================================');
			logger.info(`======= ENV: ${this.node_env} =======`);
			logger.info(`🚀 App listening on the port ${this.port}`);
			logger.info('=================================');
		});
	}




}