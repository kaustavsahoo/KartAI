import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {secret} from '../config.js';

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String,  required: true },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare the password with the hashed one
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

// Generate a json web token for the user
userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, secret, { expiresIn: '8h' });
};

export default mongoose.model('User', userSchema, "users");