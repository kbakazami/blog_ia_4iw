import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import SwaggerUi from "swagger-ui-express";
import options from "./config/swagger";
import db from "./config/db";
import articleRoutes from "./routes/article";
import bodyParser from "body-parser";
import userRoutes from "./routes/user";
// @ts-ignore
import cors from "cors";
import authRoutes from "./routes/auth";


let corsOptions = {
    origin: "*",
};


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
// @ts-ignore
const database = new db(process.env.URI_DB);

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/api/article', articleRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use('/docs', SwaggerUi.serve);
app.get('/docs', SwaggerUi.setup(options));


database.run();
const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default server;