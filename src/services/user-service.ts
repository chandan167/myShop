import { BadRequest } from 'http-errors';
import { IUser, IUserDocument, UserModel } from '../models/UserModel';
import { ForgotPasswordService } from './forgot-password-service';

export class UserService {

	static async signUp({ firstName, lastName, email, phone, password }: IUser): Promise<IUserDocument> {
		const checkEmail = await UserModel.findOne({ email: email });
		if (checkEmail) throw new BadRequest(`${email} is already used`);
		if (phone) {
			const checkPone = await UserModel.findOne({ phone });
			if (checkPone) throw new BadRequest(`${phone} is already used`);
		}
		return await UserModel.create({
			firstName, lastName, email, password, phone,
		});
	}


	static async findById(id: string):Promise<IUserDocument|null> {
		return UserModel.findById(id);
	}

	static async sendAccountVerificationMail(user: IUserDocument) {
		const forgotPassword = await ForgotPasswordService.generateToken(user);
		// TODO: send email;
		return forgotPassword;
	}

	static async findByEmail(email: string): Promise<IUserDocument|null>{
		return UserModel.findByEmail(email);
	}
}