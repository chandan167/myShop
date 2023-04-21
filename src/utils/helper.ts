import { NextFunction, Request, Handler, Response, Router } from 'express';

export const asyncResolver = (fun: Handler) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fun(req, res, next)).catch(next);

export const groupRoute = (cb: (routes: Router) => void) => {
	const router = Router();
	cb(router);
	return router;
};

export function generateOtp(n: number): string {
	const add = 1;
	let max: number = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

	if (n > max) {
		return generateOtp(max) + generateOtp(n - max);
	}

	max = Math.pow(10, n + add);
	const min = max / 10; // Math.pow(10, n) basically
	const number = Math.floor(Math.random() * (max - min + 1)) + min;

	return ('' + number).substring(add);
}