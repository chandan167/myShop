import { NextFunction, Request, Handler, Response } from 'express';

export const asyncResolver = (fun: Handler) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fun(req, res, next)).catch(next);