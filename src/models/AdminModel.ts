import { Schema, InferSchemaType, model, Model, HydratedDocument } from 'mongoose';
import { User, UserModel } from './UserModel';
import Profile from '../config/profile';


const adminSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		require: true,
		unique: true,
		ref: 'User',
	},
	isSuperAdmin: { type: Boolean, default: false },
	permissions: {
		type: [String],
		default: []
	}
});

export type Admin = InferSchemaType<typeof adminSchema>;

interface IAdminModel extends Model<Admin> {
	createAdmin(user:User,admin:Admin): Promise<User>;
  }


adminSchema.static('createAdmin', async function(user:User, admin:Admin){
	user.profileType = Profile.ADMIN;
	const newUser:HydratedDocument<User> = await UserModel.create(user);
	admin.userId = newUser._id;
	const newAdmin:HydratedDocument<Admin> = await this.create(admin);

	newUser.profile = newAdmin._id;
	await newUser.save();
	newUser.profile = newAdmin as any;
	return newUser;
});

export const AdminModel = model<Admin, IAdminModel>('Admin', adminSchema);