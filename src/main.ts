import Server from './server';
import validateEnv from './utils/validate-env';
import {dbConnect} from './database';
import { UserModel } from './models/UserModel';
import { AdminModel } from './models/AdminModel';
import Role from './config/profile';

dbConnect();

validateEnv();

const server = new Server();
server.listen();

function  addAdmin() {
    setTimeout(async () => {
        try{
            const checkUserExist = await UserModel.findOne({email: 'chandansingh16794@gmail.com'});
            if(!checkUserExist){
                const user = await UserModel.create({
                    firstName: "chandan",
                    lastName: 'singh',
                    email: 'chandansingh16794@gmail.com',
                    password: "password",
                    role: Role.ADMIN
                })
        
                const admin = await AdminModel.create({
                    isSuperAdmin: true,
                    userId: user._id
                })
        
                user.profile = admin._id;
                await user.save()
            }else{
                console.log(checkUserExist)
            }
           
        }catch(err){
            console.log(err)
        }
    }, 1000 * 5)
    
}
