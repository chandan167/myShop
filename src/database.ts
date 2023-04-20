import mongoose from 'mongoose';
import environment from './config/environment';
import { logger } from './utils/logger';


let retry = 1;
function connectDatabase() {
	if (environment.NODE_ENV !== 'production') {
		mongoose.set('debug', true);
	}
	return mongoose.connect(environment.MONGO_URI, {
		autoIndex: true,
	}).then( () =>{
		console.log('Database connected');
	});
}


export const dbConnect = () => {
	connectDatabase().catch(err => {
		logger.error(JSON.stringify(err));
		if (retry == 10) {
			process.exit(1);
		}
		retry++;
		setTimeout(() => { connectDatabase(); }, 3000);
	});
};
