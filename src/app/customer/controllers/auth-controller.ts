import { RequestHandler } from "express";
import { StatusCodes } from 'http-status-codes';

import { CustomerService } from "../../../services/customer-service";
import { User } from "../../../models/UserModel";


export class AuthController {

    static signUp: RequestHandler = async (req, res, next) => {
        const { firstName, lastName, email, phone, password } = req.body;
        const user = await CustomerService.signUp({ firstName, lastName, email, phone, password } as User)
        res.status(StatusCodes.CREATED).json(user)
    }

}