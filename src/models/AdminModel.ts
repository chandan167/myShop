import { Schema, InferSchemaType, model } from 'mongoose';


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

export const AdminModel = model<Admin>('Admin', adminSchema);