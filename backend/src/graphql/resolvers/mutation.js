import Producto from "../../models/Producto.js";
import Persona from "../../models/Person.js";
import Post from "../../models/Post.js";
import Proyecto from "../../models/Proyecto.js";

const Mutation = {

    createProyecto: async (_, { estado,fase,nombre_proyecto,objetivos_generales,objetivos_especificos,presupuesto,encargado }) => {
        const newProyecto = new Proyecto({ estado,fase,nombre_proyecto,objetivos_generales,objetivos_especificos,presupuesto,encargado })
        return await newProyecto.save();
      
    },

}
    

export default Mutation;