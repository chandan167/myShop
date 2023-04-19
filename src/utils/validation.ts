import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema } from "joi";

type ValidateFrom = 'body' | 'query' | 'header' | 'params'

export class Validate {
    static validate = (schema: Schema, validateFrom: ValidateFrom) => {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.valid(req[validateFrom])
                next()
            } catch (err:any) {
                console.log(err);
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error: err})
            }

        }
    }

    static body = (schema: Schema) => {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.valid(req.body)
                next()
            } catch (err:any) {
                console.log(err);
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error: err})
            }

        }
    }

    static query = (schema: Schema) => {
        return this.validate(schema, 'query')
    }

    static params = (schema: Schema) => {
        return this.validate(schema, 'params')
    }
}