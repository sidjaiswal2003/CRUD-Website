import { useState } from "react";
import Cardcontext from "./Cardcontext";

const Cardstate=(props)=>{
    let host='http://localhost:2000'
    const card=[
        {
            "_id": "65215a0e28b48dd00505e0345",
            "user": "652104052a61511b56e58ab8",
            "userName": "Sid updated",
            "email": "sid@gmail.com updated",
            "phone": "123234",
            "__v": 0
        },
        {
            "_id": "65215a1128b48dd00505e0347",
            "user": "652104052a61511b56e58ab8",
            "userName": "Sid updated",
            "email": "sid@gmail.com updated",
            "phone": "123234",
            "__v": 0
        },
        {
            "_id": "65215a0e28b48dd00505e0323445",
            "user": "652104052a61511b56e58ab8",
            "userName": "Sid updated",
            "email": "sid@gmail.com updated",
            "phone": "123234",
            "__v": 0
        },
        {
            "_id": "65215a0e28b48dd00505e03145",
            "user": "652104052a61511b56e58ab8",
            "userName": "Sid updated",
            "email": "sid@gmail.com updated",
            "phone": "123234",
            "__v": 0
        },
        {
            "_id": "65215a0e28b48dd00505e01245",
            "user": "652104052a61511b56e58ab8",
            "userName": "Sid updated",
            "email": "sid@gmail.com updated",
            "phone": "123234",
            "__v": 0
        },
        {
            "_id": "65215a0e28b48dd00505e0145",
            "user": "652104052a61511b56e58ab8",
            "userName": "Sid updated",
            "email": "sid@gmail.com updated",
            "phone": "123234",
            "__v": 0
        }
    ]
    const [cards,setCards]=useState(card)
    const storedToken = localStorage.getItem('token');


    const getCard=async ()=>{
        const response = await fetch(`${host}/getcard`, {
            method: "GET", 
           
            headers: {
              "Content-Type": "application/json",
              "Auth-token":storedToken
            },
           

          });
          const json= await response.json();

          
          setCards(json)

    }

    //Add card
    const addCard=async(userName,email,phone)=>{
        const response = await fetch(`${host}/addcard`, {
            method: "POST", 
           
            headers: {
              "Content-Type": "application/json",
           
            "Auth-token":storedToken
             
            },
           
           body: JSON.stringify({userName,email,phone}), 
          });
          const json= await response.json();

        
        setCards(cards.concat(json))
        
        
    }

    //delete card
    const deleteCard=async(id)=>{
        const response = await fetch(`${host}/deletecard/${id}`, {
            method: "DELETE", 
           
            headers: {
              "Content-Type": "application/json",
           
            "Auth-token":storedToken
             
            },
           

          });
          const json = await response.json();
       
        console.log("delete with this id "+ id)
        const newcard=cards.filter((card)=>{return card._id!==id})
        setCards(newcard)
    }
    
    //update card
    const updateCard=async(id,userName,email,phone)=>{
        

            const response = await fetch(`${host}/updatecard/${id}`, {
              method: "PUT", 
             
              headers: {
                "Content-Type": "application/json",
                // "Auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUyMTA0MDUyYTYxNTExYjU2ZTU4YWI4In0sImlhdCI6MTY5NjY2ODM1OX0.Hmkxu9AB0iR1JyFk5L3VlEdSvFgcgSu8fUvqLzpTKgM"
                "Auth-token":storedToken
             
               
              },
             
              body: JSON.stringify({userName,email,phone}), 
            });
            const json= await response.json(); 
        
        let newCard=JSON.parse(JSON.stringify(cards))
        for (let index = 0; index < newCard.length; index++) {
            const element = cards[index];
            if(element._id===id){
             newCard[index].userName=userName
             newCard[index].email=email
             newCard[index].phone=phone
             break;
            }
        }
        setCards (newCard)

    }
    
   
    return(
        <Cardcontext.Provider value={{cards,addCard,deleteCard,updateCard,setCards,getCard  }}>
            {props.children}

        </Cardcontext.Provider>

    )
}
export default Cardstate