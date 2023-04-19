import { Schema, InferSchemaType, model, Model, HydratedDocument } from 'mongoose';
import { User, UserModel } from './UserModel';


const customerSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		require: true,
		unique: true,
		ref: 'User'
	},
	wallet: { type: Number, default: 0 },
});

export type Customer = InferSchemaType<typeof customerSchema>;

interface ICustomerModel extends Model<Customer> {
	createCustomer(data: {user: User|unknown, customer?: Customer|undefined}): Promise<User>;
}

customerSchema.static('createCustomer', async function (data: {user: User, customer?: Customer|undefined}) {
	const newUser: HydratedDocument<User> = await UserModel.create(data.user);
	if(data.customer == undefined){
		data.customer = {} as Customer
	}
	data.customer.userId = newUser._id;
	const newCustomer: HydratedDocument<Customer> = await this.create(data.customer);

	newUser.profile = newCustomer._id;
	await newUser.save();
	newUser.profile = newCustomer as any
	return newUser
})

export const CustomerModel = model<Customer, ICustomerModel>('Customer', customerSchema);