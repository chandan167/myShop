import { NextFunction, Request, Handler, Response, Router } from 'express';

export const asyncResolver = (fun: Handler) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fun(req, res, next)).catch(next);

export const groupRoute = (cb: (routes: Router) => void) => {
	const router = Router();
	cb(router);
	return router;
};