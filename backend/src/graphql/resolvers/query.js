import Producto from "../../models/Producto.js"
import Persona from "../../models/Person.js"
import Proyecto from "../../models/Proyecto.js"
const Query = {

    hola() {
        return "Esta es la respuesta de la query hola"
    },
    proyectos: async () => {
        return await Proyecto.find()
    },
}

export default Query;