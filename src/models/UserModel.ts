import { Schema, model, Model, Document } from 'mongoose';
import Profile from '../config/profile';
import { compare, hash } from '../utils/password';
import { DateUtil } from '../utils/date';

export interface IUser{
	firstName:string;
	lastName :string|null;
	email:string;
	phone :string|null;
	emailVerifiedAt? : string|Date|null;
	phoneVerifiedAt? : string|Date|null;
	avatar: string|null;
	password: string;
	profileType: Profile;
	wallet?:number;
}

export interface IUserDocument extends IUser, Document{
	verifyEmail(): void;
    verifyPhone(): void;
    validatePassword(password: string): Promise<boolean>;
}


interface IUserModel extends Model<IUserDocument> {
	findByEmail(email: string): Promise<IUserDocument | null>;
    findByPhone(phone: string): Promise<IUserDocument | null>;
}


const userSchema = new Schema<IUserDocument>({
	firstName: { type: String, required: true },
	lastName: { type: String, default: null },
	email: { type: String, required: true, unique: true },
	phone: { type: String, index: true, default: null },
	emailVerifiedAt: { type: Date, default: null },
	phoneVerifiedAt: { type: Date, default: null },
	avatar: { type: String, default: null },
	password: { type: String, required: true },
	profileType: { type: String, enum: Object.values(Profile), default: Profile.CUSTOMER },
	wallet: {type: Number, default:0}
}, {
	timestamps: true,
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



// @typescript-eslint/no-var-requires
userSchema.plugin(require('mongoose-autopopulate'));

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await hash(this.password);
	}
	next();
});

userSchema.static('findByEmail', async function (email: string): Promise<IUserDocument | null> {
	return this.findOne({ email: email });
});

userSchema.static('findByPhone', async function (phone: string): Promise<IUserDocument | null> {
	return this.findOne({ phone: phone });
});

userSchema.method('verifyEmail', function verifyEmail() {
	this.emailVerifiedAt = DateUtil.now();
});

userSchema.method('verifyPhone', function verifyPhone() {
	this.phoneVerifiedAt = DateUtil.now();
});

userSchema.method('validatePassword', async function validatePassword(password:string) {
	return compare(password, this.password);
});

export const UserModel = model<IUserDocument, IUserModel>('User', userSchema);