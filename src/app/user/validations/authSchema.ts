import Joi from 'joi';

export const signUpSchema =  Joi.object({
	firstName: Joi.string().required().label('First Name'),
	lastName: Joi.string().allow('',null).label('Last Name'),
	email: Joi.string().required().email().label('Email'),
	phone: Joi.string().email().allow('', null).label('Phone'),
	password: Joi.string().required().label('Password'),
	confirmPassword: Joi.any().required().valid(Joi.ref('password')).label('Confirm Password').messages({'any.only': 'Confirm Password must be match with password'})
});

export const signInSchema =  Joi.object({
	email: Joi.string().required().email().label('Email'),
	password: Joi.string().required().label('Password'),
});

export const sendAccountVerificationMailSchema =  Joi.object({
	email: Joi.string().required().email().label('Email')
});