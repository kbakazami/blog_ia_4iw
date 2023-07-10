import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import SwaggerUi from "swagger-ui-express";
import options from "./config/swagger";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/docs', SwaggerUi.serve);
app.get('/docs', SwaggerUi.setup(options));


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});