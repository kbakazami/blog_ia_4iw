import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    lastName: String,
    firstName: String,
    email: String,
    password: String,
    createdAt: Date,
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;