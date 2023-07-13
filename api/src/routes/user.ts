import express from 'express';
import {adminBoard, allAccess, deleteUser, getUser, getUsers, userBoard} from "../controllers/user";
import {isAdmin, verifyToken} from "../middlewares/authJwt";

const userRoutes = express.Router();

userRoutes.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUser);
userRoutes.delete('/', deleteUser);

// Test
userRoutes.get('/test/all', allAccess);
userRoutes.get('/test/user', [verifyToken] , userBoard);
userRoutes.get('/test/admin', [verifyToken, isAdmin] , adminBoard);

export default userRoutes;