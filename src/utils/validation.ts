import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';

type ValidateFrom = 'body' | 'query' | 'header' | 'params'

export class Validate {
	static validate = (schema: Schema, validateFrom: ValidateFrom) => {
		return async(req: Request, res: Response, next: NextFunction) => {
			try {
				req[validateFrom] = await schema.validateAsync(req[validateFrom], {abortEarly: false});
				next();
			} catch (err:any) {
				this.buildError(err);
				return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(err);
			}

		};
	};

	static buildError = (error:any) =>{
		error.values = error._original;
		delete error._original;
		error.details = error.details.map((detail:any) =>{
			return {
				message: String(detail.message),
				path: detail.path.join('.'),
				label: detail.context.label,
				key: detail.context.key,
				type: detail.type
			};
		});
	};

	static body = (schema: Schema) => {
		return this.validate(schema, 'body');
	};

	static query = (schema: Schema) => {
		return this.validate(schema, 'query');
	};

	static params = (schema: Schema) => {
		return this.validate(schema, 'params');
	};
}