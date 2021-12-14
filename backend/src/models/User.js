import mongoose from 'mongoose'
import Estados_usuarios from "./Estados_usuario.js"
import Roles_usuarios from "./Roles_usuarios.js"
const {Schema, model} = mongoose;

const User = new Schema({
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
        type: Schema.Types.ObjectId,
        ref:'Roles_usuarios',
        required: true
    }
});

export default model('User', User);