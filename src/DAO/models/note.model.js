import mongoose from "mongoose";

const collection = 'notes';

const schema = new mongoose.Schema({
    title: {type: String, required: true},
    content: { type:String, required: true },
    created_at:{
        type : Object,
    },
    created_by:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    share_with:{
        type:[{
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'users'
            }
        }]
    }
})

export const noteModel = mongoose.model(collection, schema);