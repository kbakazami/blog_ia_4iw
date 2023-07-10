import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import SwaggerUi from "swagger-ui-express";
import options from "./config/swagger";
import db from "./config/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
// @ts-ignore
const database = new db(process.env.URI_DB);

app.use(express.json());

app.use('/docs', SwaggerUi.serve);
app.get('/docs', SwaggerUi.setup(options));


database.run();
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});