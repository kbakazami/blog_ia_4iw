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
            await this.client.db('blog_ia').command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }catch(e) {
            console.log(e)
        }finally{
            console.log('connected !')
            await this.client.close();
        }
    }

}