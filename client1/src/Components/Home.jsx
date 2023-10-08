import React from "react";

import Cards from "./Cards";
function Home(props){
   const {showAlert}=props
    return(
        <div>
         
         <Cards showAlert={showAlert}/>
        </div>
    )
}
export default Home