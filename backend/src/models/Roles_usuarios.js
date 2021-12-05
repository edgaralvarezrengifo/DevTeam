import pkg from 'mongoose';
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const Roles_usuarioSchema = new Schema({
    estado:{
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true
    }
  
});
export default model("Roles_usuarios",Roles_usuarioSchema )