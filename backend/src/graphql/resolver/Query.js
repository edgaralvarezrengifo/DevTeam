import User from "../../models/User.js"
const Query = {

    hola() {
        return "Esta es la respuesta de la query hola"
    },
    user: async () => {
        return await User.find()
    },
}

export default Query;