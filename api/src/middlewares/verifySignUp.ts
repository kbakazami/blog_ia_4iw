import User from "../models/user";
import {NextFunction, Request, Response} from "express";
const ROLES = ["user", "admin"];

const checkDuplicateEmail = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body!.email;
    const user = await User.findOne({email: email})
    if(user) {
        return res.status(400).json({
            message: 'The email already exists'
        });
    }

    next();
}

const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
    if(req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exist`
                });
                return;
            }
        }
    }

    next();
}

export {checkDuplicateEmail, checkRolesExisted};
