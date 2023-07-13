import express from "express";
import {checkDuplicateEmail, checkRolesExisted} from "../middlewares/verifySignUp";
import {signUp, signIn} from "../controllers/auth";


const authRoutes = express.Router();

authRoutes.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

authRoutes.post("/signup", [checkDuplicateEmail, checkRolesExisted], signUp);

authRoutes.post("/signin", signIn);


export default authRoutes;