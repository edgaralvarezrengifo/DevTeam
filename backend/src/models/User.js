import mongoose from 'mongoose'
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
        ref:'estados_usuarios',
        require: true
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