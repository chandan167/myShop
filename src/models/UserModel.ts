import { Schema, InferSchemaType, model } from 'mongoose';
import Role from '../config/role';


const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String },
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true, index: true },
	emailVerifiedAt: { type: Date, default: null },
	phoneVerifiedAt: { type: Date, default: null },
	avatar: { type: String, default: null },
	profileId: {
		type: Schema.Types.ObjectId,
		required: true,
		// Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
		// will look at the `docModel` property to find the right model.
		index: true,
		refPath: 'role'
	},
	role: { type: Role, enum: Object.values(Role), default: Role.CUSTOMER },
});

export type User = InferSchemaType<typeof userSchema>;


export const UserModel = model('User', userSchema);