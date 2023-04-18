import { Schema, InferSchemaType, model } from 'mongoose';


const customerSchema = new Schema({
	userId : {
		type: Schema.Types.ObjectId,
		require: true,
		unique: true,
		ref: 'User'
	},
	wallet: {type: Number, default:0},
});

export type Customer = InferSchemaType<typeof customerSchema>;


export const CustomerModel = model<Customer>('Customer', customerSchema);