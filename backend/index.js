import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import authroute from './routes/auth.js'
import crudRoute from './routes/crud.js'
dotenv.config()
import  connect  from "./db/connect.js";
import cors from "cors"

const app =express()
app.use(cors())
app.use(express.json()) //To get the jason file from the body

app.use('/',authroute)
app.use('/',crudRoute)

const start=async ()=>{
    try {
        connect(process.env.URL);
        app.listen(process.env.PORT,()=>{
            console.log("Mongo is connected")
        })
    } catch (error) {
        console.log(error)
    }

}
start();
// mongoose.set("strictQuery",false)
// mongoose.connect(process.env.URL,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// }).then(()=>{
//     app.listen(process.env.PORT,()=>{
//         console.log(`Mongo is connected`)
//     })
// }).catch((error)=>{
//     console.log(`${error} did not connect `)
// })

