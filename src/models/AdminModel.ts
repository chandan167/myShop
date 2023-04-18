import { Schema, InferSchemaType, model } from 'mongoose';


const adminSchema = new Schema({
	isSuperAdmin: {type: Boolean, default: false},
});

export type User = InferSchemaType<typeof adminSchema>;


export const UserModel = model('Admin', adminSchema);