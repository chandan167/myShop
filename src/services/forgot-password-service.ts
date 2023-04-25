import { v4 as uuidv4 } from 'uuid';
import { IForgotPasswordDocument, ForgotPasswordModel } from '../models/ForgotPasswordModel';
import { IUserDocument } from '../models/UserModel';
import { DateUtil } from '../utils/date';


export class ForgotPasswordService {

	static async generateToken(user: IUserDocument): Promise<IForgotPasswordDocument> {
		await ForgotPasswordModel.deleteMany({ email: user.email });
		return await ForgotPasswordModel.create({
			email: user.email,
			userId: user._id,
			expireAt: DateUtil.addMinutes(10),
			token: uuidv4()
		});
	}
}