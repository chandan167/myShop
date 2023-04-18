import { Schema, InferSchemaType, model } from 'mongoose';


const customerSchema = new Schema({
	wallet: {type: Number, default:0},
});

export type User = InferSchemaType<typeof customerSchema>;


export const UserModel = model('Customer', customerSchema);