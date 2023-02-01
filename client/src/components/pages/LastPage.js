import React from "react";
import { Redirect } from "@reach/router";

import "../../utilities.css";
import "./FeaturesPage.css";
import "./HomePage.css"
import logo from "../../public/logo.png";
import Cards from "./Cards.js";
const LastPage = (props) => {
    document.title = 'Features'
    return (
    <div className="lastpage-container">
           
           <div className='columns'>
               <div className='column is-two-thirds'>
                   
               </div>
               
           </div>

        <div className='footer'>
            2023 team amsa
        </div>

        
        </div>
        
    );
}

export default LastPage;