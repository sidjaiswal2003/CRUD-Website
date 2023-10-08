import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password:{
        type :String,
        required:true

    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Others'],
    },
    howDidYouHear: {
        type: [String],
       // required: true,
    },
    city: {
        type: String,
        required: true,
       // enum: ['Mumbai', 'Pune', 'Ahmedabad'],
    },
    state: {
        type: String,
        required: true,
       // enum: ['Gujarat', 'Maharashtra', 'Karnataka'],
    },
});
const User=mongoose.model("User",userSchema)
User.createIndexes()
export default User


