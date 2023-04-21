/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotFound, Unauthorized } from 'http-errors';


import { IUser } from '../../../models/UserModel';
import { JwtUtil } from '../../../utils/jwt';
import { UserService } from '../../../services/user-service';


export class AuthController {


	static signUp: RequestHandler = async (req, res, _next) => {
		const { firstName, lastName, email, phone, password } = req.body;
		const user = await UserService.signUp({ firstName, lastName, email, phone, password } as IUser);
		const token = JwtUtil.generateToken({ id: user._id, profileType: user.profileType }, req.get('user-agent') as string);
		res.status(StatusCodes.CREATED).json(token);
	};

	static signIn: RequestHandler = async (req, res, _next) =>{
		const {email, password} = req.body;
		const user = await UserService.findByEmail(email);
		if(!user || !await user.validatePassword(password)) throw new Unauthorized('Invalid credential');
		const token = JwtUtil.generateToken({ id: user._id, profileType: user.profileType }, req.get('user-agent') as string);
		res.json(token);
	};
	

	static profile: RequestHandler = async (req, res, _next) => {
		const user = req.auth.user;
		res.json(user);
	};


	static sendAccountVerificationMail: RequestHandler = async (req, res, _next) =>{
		const {email}  = req.body;
		const user = await UserService.findByEmail(email);
		if(!user) throw new NotFound('Account not found');
		await UserService.sendAccountVerificationMail(user);
		res.json({message: 'Verification mail has been send please check your inbox'});
	};
}