import React, { useContext } from "react";
import Cardcontext from "../Context/Cardcontext";

function CardsItem(props) {
  const { card ,updatecard} = props;
  const context=useContext(Cardcontext)
  const {deleteCard}=context
  const handle=()=>{
    
    deleteCard(card._id)
    props.showAlert("Deleted Successfully","success")
  }

  

  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{card.userName}</h5>
            <p className="card-text"> {card.email}</p>
            <p className="card-text"> {card.phone}</p>
            <i className="fa-solid fa-trash-can mx-2" onClick={handle} ></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updatecard(card)}} ></i>
            
          </div>
        </div>
      </div>
    </>
  );
}
export default CardsItem;
