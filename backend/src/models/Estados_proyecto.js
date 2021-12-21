import pkg from 'mongoose';
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const Estados_proyectoSchema = new Schema({
    estado:{
        type: String,
        required: true
    }
  
});
export default model("Estados_proyectos",Estados_proyectoSchema )