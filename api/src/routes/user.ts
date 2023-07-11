import express from 'express';
import {deleteUser, getUser, getUsers} from "../controllers/user";

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUser);
userRoutes.delete('/', deleteUser);

export default userRoutes;