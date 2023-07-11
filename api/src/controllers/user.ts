import {Request, Response, RequestHandler} from "express";
import UserModel from "../models/user";
import {User, Users} from "../types/user";

export const getUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        const users: Users = await UserModel.find();
        await res.json(users);
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
        } else {
            console.error(error.message);
        }
    }
}

export const getUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user: User | null = await UserModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        await res.json(user);
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
        } else {
            console.error(error.message);
        }
    }
}

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user: User | null = await UserModel.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        await res.json({message: 'User deleted'});
    } catch (error: any) {
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
        } else {
            console.error(error.message);
        }
    }
}
