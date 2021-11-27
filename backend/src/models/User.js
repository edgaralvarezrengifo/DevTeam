import mongoose from 'mongoose'
const {Schema, model} = mongoose;

const PersonaModel = new Schema({
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
        required: true
    }
});

export default model('PersonaModel', PersonaModel);