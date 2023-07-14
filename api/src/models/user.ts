import {Schema, model} from 'mongoose';

const userSchema: Schema = new Schema({
    lastName: String,
    firstName: String,
    email: String,
    password: String,
    createdAt: Date,
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
});

const UserModel = model('User', userSchema);

export default UserModel;