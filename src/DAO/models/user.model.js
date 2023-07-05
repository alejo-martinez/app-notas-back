import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'users';

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    last_name: String,
    nickname: {type: String, unique: true, required: true},
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true}
});

export const userModel = mongoose.model(collection, schema);