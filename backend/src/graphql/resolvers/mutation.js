import Proyecto from "../../models/Proyecto.js";

const Mutation = {

    createProyecto: async (_, { estado,fase,nombre_proyecto,objetivos_generales,objetivos_especificos,presupuesto,encargado }) => {
        const newProyecto = new Proyecto({ estado,fase,nombre_proyecto,objetivos_generales,objetivos_especificos,presupuesto,encargado })
        return await newProyecto.save();
      
    },
    updateFaseProyecto: async(_,{_id, fase})=>{
        const idd = await Proyecto.findById({_id});
        await Proyecto.updateOne({_id},{$set: {fase}}); 
        return await Proyecto.findById(_id);
    },

    createUser: async(_, { name, email, status, user, password, rol })=>{
        const newUser = new User({ name, email, status, user, password, rol })
        return await newUser.save();
    },
    updateUser: async(_,{_id, name, email})=>{
        const idd = await User.findById({_id});
        User.id="asdasd";
        await User.updateOne({_id},{$set: {name, email}}); // no se a que asignarle este valor, que es donde se hace el update
        return await User.findById(_id);
    }


}
    

export default Mutation;