import { IUserDocument } from '../../models/UserModel';

export {};

declare global {
  namespace Express {
    export interface Request {
      auth:{
        user?: IUserDocument;
      }
      
    }
  }
}