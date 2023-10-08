import mongoose, { Schema } from "mongoose";

const cardSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, //Foreign Key
        ref:"User"

    },
    userName:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true
    }
})
const Card=mongoose.model("Card",cardSchema)
export default Card