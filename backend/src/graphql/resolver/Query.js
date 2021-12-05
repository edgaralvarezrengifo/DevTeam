import User from "../../models/User.js";
import mongoose from "mongoose";
const { Schema } = mongoose;

const Query = {

    hola() {
        return "Esta es la respuesta de la query hola"
    },
    user: async () => {
        const schema = new Schema();
        schema.path('estados_usuarios');
       console.log(await User.find({}).populate({ path: 'status', model: 'user_state' }))
        //return await User.find().populate('status','estado')
    }
}

export default Query;