import mongoose from "mongoose"

const userCollection = "users";

const userSchema = new mongoose.Schema({
    //definimos las propiedade sy caracteristicas de los usuarios antes de guarda  en la db
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});


export const UserModel = mongoose.model(userCollection, userSchema);