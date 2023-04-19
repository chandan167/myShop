import {Router} from 'express';
import { groupRoute } from '../utils/helper';
import { customerRoute } from './customer.router';

export const router = Router();

router.use('/api/v1',groupRoute(router =>{
    router.use('/customer', customerRoute)
}))