import { MongoClient } from "mongodb";
import mongoose from 'mongoose';

export default class db {

    readonly uri: string
    client: MongoClient

    constructor(uri: string) {
        this.uri = uri;
        this.client = new MongoClient(uri);
    }

    async run () {
        try{
            await this.client.connect();
            await mongoose.connect(this.uri);
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }catch(e) {
            console.log(e)
        }
    }

}