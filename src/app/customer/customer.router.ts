import {Router} from 'express';
import { asyncResolver, groupRoute } from '../../utils/helper';
import { AuthController } from './controllers/auth-controller';
import { Validate } from '../../utils/validation';
import { signUpSchema } from './validations/authSchema';
import { auth } from '../../middleware/auth';
import Profile from '../../config/profile';

export const customerRoute = Router();

customerRoute.use('/auth', groupRoute(router => {
	router.post('/sign-up', Validate.body(signUpSchema), asyncResolver(AuthController.signUp));
	router.use(auth(Profile.CUSTOMER));
	router.get('/profile', asyncResolver(AuthController.profile));
}));