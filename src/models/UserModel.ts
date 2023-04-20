import { Schema, InferSchemaType, model } from 'mongoose';
import Profile from '../config/profile';
import { hash } from '../utils/password';


const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, default: null },
	email: { type: String, required: true, unique: true },
	phone: { type: String, index: true, default: null },
	emailVerifiedAt: { type: Date, default: null },
	phoneVerifiedAt: { type: Date, default: null },
	avatar: { type: String, default: null },
	password: { type: String, required: true },
	profile: {
		type: Schema.Types.ObjectId,
		index: true,
		refPath: 'profileType',
		autopopulate: true
	},
	profileType: { type: String, enum: Object.values(Profile), default: Profile.CUSTOMER },
}, {
	toJSON: {
		transform(doc, ret) {
			ret.id = ret._id;
			delete ret.password;
			delete ret.__v;
		}
	},
	toObject: {
		transform(doc, ret) {
			ret.id = ret._id;
		}
	}
});

export type User = InferSchemaType<typeof userSchema>;

// @typescript-eslint/no-var-requires
userSchema.plugin(require('mongoose-autopopulate'));
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await hash(this.password);
	}
	next();
});

export const UserModel = model<User>('User', userSchema);