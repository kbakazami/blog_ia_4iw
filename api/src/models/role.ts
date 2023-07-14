import {Schema, model} from "mongoose";

const roleSchema: Schema = new Schema({
    name: String,
});

const Role = model('Role', roleSchema);

export default Role;