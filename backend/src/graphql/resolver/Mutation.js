import User from "../../models/User.js";


const Mutation = {
    createUser: async(_, { name, email, status, user, password, rol })=>{
        const newUser = new User({ name, email, status, user, password, rol })
        return await newUser.save();
    } 
}
    

export default Mutation;