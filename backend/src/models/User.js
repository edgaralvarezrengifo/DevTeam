import mongoose from 'mongoose'
import Estados_usuarios from "./Estados_usuario.js"
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
        type: Schema.Types.ObjectId,
        ref:'Estados_usuarios',
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