import superTest from 'supertest';
import assert from 'assert';
import express from "express";
import server from "../../index";
import articleRoutes from "../../routes/article";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
beforeEach(async() => {
    await mongoose.connect(
        // @ts-ignore
        process.env.URI_DB_TEST,
        {useNewUrlParser: true},
    );
});

afterEach(async() => {
    await mongoose.connection.db.dropDatabase()
    await mongoose.connection.close()
});

const app = express();
app.use(express.json());
app.use("/api", articleRoutes);

describe('test article controller', () => {
    it('should return 200', async () => {
        const response = await superTest(app).get('/api/article')
            .expect(200);
    });
});

