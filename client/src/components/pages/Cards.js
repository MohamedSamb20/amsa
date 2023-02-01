import React from "react";
import { Redirect } from "@reach/router";

import "../../utilities.css";
import "./FeaturesPage.css";
import logo from "../../public/logo.png";
const Cards = (props) => {
    
    return (
            <section>
            <div className='allcards'>
                <div className="card" style={{width:'auto'}}>
                    <header className="card-header">
                        <p className="card-header-title">
                        {props.name}
                        </p>
                        <button className="card-header-icon" aria-label="more options">
                        <span className="icon">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                        </button>
                    </header>
                    <div className="card-content" style={{alignContent:'center'}}>
                        <div className="content">
                        <img src={logo} />
                        <a>{props.description}</a>
                        </div>
                    </div>
            </div>
                
            </div>

            </section>
        
       
        
    );
}

export default Cards;