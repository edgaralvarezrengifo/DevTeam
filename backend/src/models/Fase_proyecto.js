import pkg from 'mongoose';
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const Fase_proyectoSchema = new Schema({
    fase:{
        type: String,
        required: true
    }
  
});
export default model("Fase_proyecto",Fase_proyectoSchema )