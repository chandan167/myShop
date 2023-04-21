import { HydratedDocument, InferSchemaType, Model, model, Schema } from 'mongoose';
import { DateUtil } from '../utils/date';

export type ForgotPassword = HydratedDocument<InferSchemaType<typeof forgotPasswordSchema>>;

interface IForgotPasswordMethod {
    verifyExpireAt(): boolean;
}

export type IForgotPasswordModel = Model<ForgotPassword, object, IForgotPasswordMethod>

const forgotPasswordSchema = new Schema<object, IForgotPasswordModel, IForgotPasswordMethod>(
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



forgotPasswordSchema.method('verifyExpireAt', function verifyExpireAt() {
	return DateUtil.now() < this.expireAt;
});

export const ForgotPasswordModel = model<ForgotPassword, IForgotPasswordModel>('ForgotPassword', forgotPasswordSchema);
