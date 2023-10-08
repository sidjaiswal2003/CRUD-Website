import { useState } from "react";
import React, { useContext } from "react";
import Cardcontext from "../Context/Cardcontext";

const Addcard = (props) => {
  const [card, setCard] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const context = useContext(Cardcontext);
  const { addCard } = context;
  const handleClick = (e) => {
    e.preventDefault();
    addCard(card.username,card.email,card.phone)
    setCard({username: "",
    email: "",
    phone: ""})
    props.showAlert("Added Successfully","success")
  };
  const onchange = (e) => {
    setCard({...card,[e.target.name]:e.target.value})
  };

  return (
    <div className="container my-3">
      <h2>Add Card</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control" 
            id="username"
            name="username"
            value={card.username}
            onChange={onchange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={card.email}
            onChange={onchange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={card.phone}
            onChange={onchange}
            required
          />
        </div>
        <button 
        disabled={card.username.length<2 || card.email.length<4 || card.phone.length<5}
          type="submit"
          className="btn btn-primary my-3"
          onClick={handleClick}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Addcard;
