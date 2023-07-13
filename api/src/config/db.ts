import mongoose from 'mongoose';
import Role from "../models/role";

export default class db {

    readonly uri: string
    roles: any

    constructor(uri: string) {
        this.uri = uri;
        this.roles = Role;
    }

    async run () {
        try{
            await mongoose.connect(this.uri);
            console.log("Pinged your deployment. You successfully connected to MongoDB!");

            await this.init();
        }catch(e) {
            console.log(e)
        }
    }

    async init () {
        const count = await Role.estimatedDocumentCount();
            if (count === 0) {
                  await Promise.all([
                        new Role({ name: "user" }).save(),
                        new Role({ name: "admin" }).save()
                    ]);
            }
    }
}