import { Schema, InferSchemaType, model } from 'mongoose';
import Role from '../config/role';
import { hash } from '../utils/password';


const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String },
	email: { type: String, required: true, unique: true },
	phone: { type: String, index: true },
	emailVerifiedAt: { type: Date, default: null },
	phoneVerifiedAt: { type: Date, default: null },
	avatar: { type: String, default: null },
	password: { type: String, required: true },
	profile: {
		type: Schema.Types.ObjectId,
		// Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
		// will look at the `docModel` property to find the right model.
		index: true,
		refPath: 'role',
		autopopulate: true
	},
	role: { type: String, enum: Object.values(Role), default: Role.CUSTOMER },
});

export type User = InferSchemaType<typeof userSchema>;

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await hash(this.password);
	}
	next();
})

export const UserModel = model<User>('User', userSchema);