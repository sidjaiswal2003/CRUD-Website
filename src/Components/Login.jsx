import React, { useState } from "react";
//import {useHistory} form "react-router-dom"; 
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
    //let history=useHistory()
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:2000/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({email:formData.email,password:formData.password})
    });
    const json = await response.json();
   
  
  

    if(json.success){
        localStorage.setItem('token',json.authToken)
        navigate('/')
        props.showAlert("Logged In","success")
    }
    else{
        props.showAlert("Invalid Credential","danger")
    }
    
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={formData.email}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
          value={formData.password}
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          
        >
          Submit
        </button>
      </form>
    </>
  );
};
export default LoginPage;
