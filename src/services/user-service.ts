import { UserModel } from '../models/UserModel';

export class UserService{

	static async findById(id:string){
		const user = await UserModel.findById(id);
		return user;
	}
}