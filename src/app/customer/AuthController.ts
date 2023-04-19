import { RequestHandler } from "express";
import { StatusCodes } from 'http-status-codes';
import { CustomerModel } from "../../models/CustomerModel";


export class AuthController {

    static signUp: RequestHandler = async (req, res, next) => {
        const { firstName, lastName, email, phone, password } = req.body;
        const user = await CustomerModel.createCustomer({
            user: {
                firstName, lastName, email, password, phone,
            }
        })
        res.status(StatusCodes.CREATED).json(user)
    }

}