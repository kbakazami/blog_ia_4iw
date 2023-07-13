import UserModel from "../models/user";
import Role from "../models/role";
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const signUp = async (req: Request, res: Response) => {

    try {
        const user = new UserModel({
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            createdAt: new Date()
        });

        const roles = await Role.find({
            name: {$in: req.body.roles}
        })

        user.roles = roles.map((role: any) => role._id);

        await user.save();
        res.json({message: 'User was registered successfully!'});

    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
        } else {
            console.error(error.message);
        }
    }
}

const signIn = async (req: Request, res: Response) => {

    try {
        const user = await UserModel.findOne({
            email: req.body.email
        })
            .populate('roles', '-__v');

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: 'Invalid Password'
            });
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {
            expiresIn: 86400 // 24 hours
        });

        const authorities = [];

        // @ts-ignore
        for (let i = 0; i < user.roles.length; i++) {
            // @ts-ignore
            authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
        }

        return res.status(200).json({
            id: user._id,
            lastName: user.lastName,
            firstName: user.firstName,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
        } else {
            console.error(error.message);
        }
    }
}

export {signUp, signIn};
