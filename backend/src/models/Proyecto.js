import pkg from 'mongoose';
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const ProyectoSchema = new Schema({
    estado:{
        type: String,
        required: true
    },
    fase: {
        type: String,
        required: true
    }, 
    nombre_proyecto: {
        type: String,
        required: true
    },
    objetivos_generales: {
        type: String,
        required: false
    },
    objetivos_especificos: {
        type: String,
        required: false
    },
    presupuesto: {
        type: Number,
        required: true
    },
    encargado:{
        type: String,
        required: true
    },
    avance:{
        type: String,
        required: false
    },
    observaciones:{
        type: String,
        required: true
    }
});
export default model("Proyectos",ProyectoSchema )