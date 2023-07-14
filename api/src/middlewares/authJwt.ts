import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import UserModel from "../models/user";
import Role from "../models/role";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['x-access-token'];
    const secret = process.env.JWT_SECRET;
    if (!token) {
        return res.status(403).json({message: 'No token provided'});
    }

    jwt.verify(
        token.toString(),
        secret!.toString(),
        (error: any, decoded: any) => {
            if (error) {
                return res.status(401).json({message: 'Unauthorized'});
            }
            req.body.userId = decoded.id;
            next();
        }
    );
}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.body.userId) return res.status(401).json({message: 'Unauthorized'});

        const user = await UserModel.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const roles = await Role.find({_id: {$in: user.roles}});

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
                next();
                return;
            }
        }
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

export {verifyToken, isAdmin};
