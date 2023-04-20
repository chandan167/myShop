import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomerService } from '../../../services/customer-service';
import { User } from '../../../models/UserModel';
import { JwtUtil } from '../../../utils/jwt';


export class AuthController {

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	static signUp: RequestHandler = async (req, res, _next) => {
		const { firstName, lastName, email, phone, password } = req.body;
		const user = await CustomerService.signUp({ firstName, lastName, email, phone, password } as User);
		const token = JwtUtil.generateToken({ id: user._id, profileType: user.profileType }, req.get('user-agent') as string);
		res.status(StatusCodes.CREATED).json(token);
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	static profile: RequestHandler = async (req, res, _next) => {
		const user = req.auth.user;
		res.json(user);
	};

}