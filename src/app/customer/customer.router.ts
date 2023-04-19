import {Router} from 'express';
import { asyncResolver, groupRoute } from '../../utils/helper';
import { AuthController } from './controllers/auth-controller';
import { Validate } from '../../utils/validation';
import { signUpSchema } from './validations/authSchema';

export const customerRoute = Router()

customerRoute.use('/auth', groupRoute(router => {
    router.post('/sign-up', Validate.body(signUpSchema), asyncResolver(AuthController.signUp))
}))