import Server from './server';
import validateEnv from './utils/validate-env';
import {dbConnect} from './database';

dbConnect();

validateEnv();

const server = new Server();
server.listen();