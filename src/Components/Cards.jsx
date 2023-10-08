import React, { useContext, useEffect, useRef,useState } from "react";
import Cardcontext from "../Context/Cardcontext";
import CardsItem from "./CardsItem";
import Addcard from "./Addcard";
import { useNavigate } from "react-router-dom";

function Cards(props) {
  const context = useContext(Cardcontext);
  const { cards, getCard ,updateCard} = context;
  let navigate=useNavigate()
  useEffect(() => {
    if( localStorage.getItem('token')){

        getCard();
    }
    else{
        navigate('/login')

    }
    // eslint-disable-next-line
  }, []);
  const [card, setCard] = useState({
    id:"",
    euserName: "",
    eemail: "",
    ephone: "",
  });
  const updatecard = (currentcard) => {
    ref.current.click();
    setCard({id:currentcard._id,euserName: currentcard.userName, eemail: currentcard.email, ephone: currentcard.phone})
    //props.showAlert("Updated Successfully","success")
  };
  const refClose=useRef(null)
  const ref = useRef(null);
  const handleClick = (e) => {
    refClose.current.click()
    updateCard(card.id,card.euserName,card.eemail,card.ephone)
    props.showAlert("Updated Successfully","success")

  };
  const onchange = (e) => {
    setCard({...card,[e.target.name]:e.target.value})
  };
  return (
    <>
      <Addcard showAlert={props.showAlert}></Addcard>

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Card
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="euserName"
                    name="euserName"
                    value={card.euserName}
                    onChange={onchange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="eemail"
                    name="eemail"
                     value={card.eemail}
                    onChange={onchange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="ephone"
                    name="ephone"
                    value={card.ephone}
                    onChange={onchange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update card
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your cards</h2>
        <div className="container mx-2">
        {cards.length===0 && "No Cards Available"}
        </div>
      
        {cards.map((card) => {
          return (
            <CardsItem 
              showAlert={props.showAlert}
              key={card._id}
              updatecard={updatecard}
              card={card}
            ></CardsItem>
          );
        })}
      </div>
    </>
  );
}
export default Cards;
