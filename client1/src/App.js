import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Cardstate from "./Context/Cardstate";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useState } from "react";

function App() {
  const [alert,setAlert]=useState()
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
    <Cardstate>

      <Router>
        <Navbar></Navbar>
        <Alert alert={alert}></Alert>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/login" element={<Login  showAlert={showAlert}></Login>}></Route>
          <Route exact path="/signup" element={<Signup  showAlert={showAlert}></Signup>}></Route>
        </Routes>

        </div>
      </Router>

    </Cardstate>
    </>
  );
}

export default App;




