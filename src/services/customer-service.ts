import {BadRequest} from 'http-errors';

import { CustomerModel } from '../models/CustomerModel';
import { User, UserModel } from '../models/UserModel';

export class CustomerService{

	static async signUp({ firstName, lastName, email, phone, password }: User){
		const checkEmail = await UserModel.findOne({email:email});
		if(checkEmail) throw new BadRequest(`${email} is already used`);
		if(phone){
			const checkPone = await UserModel.findOne({phone});
			if(checkPone) throw new BadRequest(`${phone} is already used`);
		}
		const user = await CustomerModel.createCustomer({
			user: {
				firstName, lastName, email, password, phone,
			}
		});
		return user;
	}
}