import {Router} from 'express';
import { asyncResolver, groupRoute } from '../utils/helper';
import { AuthController } from '../app/customer/AuthController';

export const customerRoute = Router()

customerRoute.use('/auth', groupRoute(router => {
    router.post('/sign-up',asyncResolver(AuthController.signUp))
}))