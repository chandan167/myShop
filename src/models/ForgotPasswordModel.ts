import { Document, Model, model, Schema } from 'mongoose';
import { DateUtil } from '../utils/date';

export interface IForgotPassword {
	userId: Schema.Types.ObjectId;
	email?: string | null;
	phone?: string | null;
	expireAt: number;
	token?: string | null;
	otp?: string | null;
}

export interface IForgotPasswordDocument extends IForgotPassword, Document {
	isExpire(): boolean;
}

interface IForgotPasswordModel extends Model<IForgotPasswordDocument> {
	findByEmail(email: string): Promise<IForgotPasswordDocument | null>;
	findByPhone(phone: string): Promise<IForgotPasswordDocument | null>;
	findByToken(token: string): Promise<IForgotPasswordDocument | null>;
}


const forgotPasswordSchema = new Schema<IForgotPasswordDocument>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			require: true,
			ref: 'User'
		},
		email: {
			type: String,
			index: true,
			default: null
		},
		phone: {
			type: String,
			index: true,
			default: null
		},
		expireAt: {
			type: Number,
			require: true,
		},
		token: {
			type: Schema.Types.String,
			index: true,
			default: null
		},
		otp: {
			type: Number,
			default: null
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret) {
				delete ret.__v;
				ret.id = ret._id;
			},
		},
		toObject: {
			transform(doc, ret) {
				ret.id = ret._id;
			},
		},
	},
);



forgotPasswordSchema.method('isExpire', function verifyExpireAt() {
	return DateUtil.now() < this.expireAt;
});

forgotPasswordSchema.static('findByEmail', async function findByEmail(email:string):Promise<IForgotPasswordDocument | null> {
	return this.findOne({email});
});

forgotPasswordSchema.static('findByPhone', async function findByPhone(phone:string):Promise<IForgotPasswordDocument | null> {
	return this.findOne({phone});
});

forgotPasswordSchema.static('findByToken', async function findByToken(token:string):Promise<IForgotPasswordDocument | null> {
	return this.findOne({token});
});


export const ForgotPasswordModel = model<IForgotPasswordDocument, IForgotPasswordModel>('ForgotPassword', forgotPasswordSchema);
