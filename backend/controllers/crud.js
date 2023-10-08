import User from "../models/Users.js";
import Card from "../models/Card.js"
export const getUser=async(req,res)=>{
    try {
        const  id=req.user.id
        console.log(id)
        const user= await User.findById(id).select("-password")
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
  

}

export const getCards=async(req,res)=>{
    try {
        
        const cards=await Card.find({user:req.user.id})
        res.status(200).json(cards)
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

export const addCards=async(req,res)=>{
    try {
        
        const {userName,email,phone}=req.body;
        const newcard=new Card({
            userName,
            email,
            phone,
            user:req.user.id
        })
        const savedcard= await newcard.save()
        res.status(200).json(savedcard)
    } catch (error) {
        res.status(404).json({msg:error.message})
        
    }


}

export const updateCard=async(req,res)=>{
    try {
      
        const {userName,email,phone}=req.body;
        const newcard={}
        if(userName){newcard.userName=userName}
        if(email){newcard.email=email}
        if(phone){newcard.phone=phone}

        let card=await Card.findById(req.params.id)
        if(!card){res.status(404).send("Not found")}
        if(card.user.toString()!=req.user.id){res.status(404).send("You not allowed to change other cards")}

        card=await Card.findByIdAndUpdate(req.params.id,{$set:newcard},{new:true})
        res.status(200).json(card)

        
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}
export const deleteCard=async(req,res)=>{
    try {
        const {userName,email,phone}=req.body;
       
        let card=await Card.findById(req.params.id)
        if(!card){res.status(404).send("Not found")}
        if(card.user.toString()!=req.user.id){res.status(404).send("You not allowed to delete other cards")}

        card=await Card.findByIdAndDelete(req.params.id)
        res.status(200).json("Success: Card has been deleted")

        
    } catch (error) {
        res.status(404).json({msg:error.message})
        
    }


}


