import { RequestHandler } from 'express';
import { Unauthorized } from 'http-errors';
import Profile from '../config/profile';
import { JwtUtil } from '../utils/jwt';
import { UserService } from '../services/user-service';
import { IUserDocument } from '../models/UserModel';


export function auth(profile: Profile): RequestHandler {
	return async (req, res, next) => {
		try {
			const authorization = req.headers['authorization'];
			if (!authorization) next(new Unauthorized('Auth token not found'));
			const token: string[] = authorization?.split(' ') as string[];
			if (token[0] !== 'Bearer') next(new Unauthorized('Invalid Auth token'));
			if (!token[1]) next(new Unauthorized('Invalid Auth token'));

			const decodeData: any = JwtUtil.verifyAuthToken(token[1], req.headers['user-agent'] as string);
			if (decodeData.profileType !== profile) next(new Unauthorized('Invalid Auth token'));
			req.auth = {
				user: await UserService.findById(decodeData.id) as IUserDocument
			};
			next();

		} catch (error) {
			next(new Unauthorized('Invalid Auth token'));
		}
	};
}