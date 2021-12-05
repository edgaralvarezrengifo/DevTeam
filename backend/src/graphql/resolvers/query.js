
import Proyecto from "../../models/Proyecto.js"
import User from "../../models/User.js"
import Estados_proyecto from "../../models/Estados_proyecto.js"
import Estados_usuarios from "../../models/Estados_usuario.js"
import Fase_proyecto from "../../models/Fase_proyecto.js"
import Roles_usuario from "../../models/Roles_usuarios.js"
const Query = {

    hola() {
        return "Esta es la respuesta de la query hola"
    },
    proyectos: async () => {
        return await Proyecto.find()
    },
    user: async () => {
        return await User.find()
    },
    estados_proyecto:async () => {
        return await Estados_proyecto.find()
    },
    estados_usuario:async () => {
        return await Estados_usuarios.find()
    },
    fase_proyecto:async () => {
        return await Fase_proyecto.find()
    },
    roles_usuario:async () => {
        return await Roles_usuario.find()
    }
}

export default Query;