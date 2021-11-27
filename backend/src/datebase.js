import mongoose from "mongoose";

mongoose.connect("mongodb+srv://public:devteam@db-ciclo4.isj20.mongodb.net/admin?authSource=admin&replicaSet=atlas-zdpxi4-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("La base de datos está conectada"))
    .catch(err => console.log(err));
    