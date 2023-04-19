import Joi from "joi";

export const signUpSchema =  Joi.object({
    firstName: Joi.string().required().label('firstName'),
    lastName: Joi.string().allow('',null).label('lastName'),
    email: Joi.string().required().email().label('email'),
    phone: Joi.string().email().allow('', null).label('phone'),
    password: Joi.string().required().label('password')
})