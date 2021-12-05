import User from "../../models/User.js";


const Mutation = {
    createUser: async(_, { name, email, status, user, password, rol })=>{
        const newUser = new User({ name, email, status, user, password, rol })
        return await newUser.save();
    },
    updateUser: async(_,{_id, name, email})=>{
        await User.updateOne({_id},{$set: {name, email}}); // no se a que asignarle este valor, que es donde se hace el update
        return await User.findById(_id);
    },
    deleteUser: async(_,{_id})=>{
        await User.findByIdAndDelete({_id})
        return "Delete successful"
    }
}
    

export default Mutation;