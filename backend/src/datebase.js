import mongoose from "mongoose";

mongoose.connect("mongodb+srv://public:devteam@db-ciclo4.isj20.mongodb.net/Ciclo_4?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("La base de datos está conectada"))
    .catch(err => console.log(err));
    