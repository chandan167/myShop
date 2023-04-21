import {Router} from 'express';
import { groupRoute } from '../utils/helper';
import { userRoute } from '../app/user/user.router';

export const router = Router();

router.use('/api/v1',groupRoute(router =>{
	router.use('/user', userRoute);
}));