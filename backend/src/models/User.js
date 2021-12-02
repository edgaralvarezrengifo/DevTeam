import mongoose from 'mongoose'
const {Schema, model} = mongoose;

const User = new Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true    
    },
    status:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: false
    }
});

export default model('User', User);