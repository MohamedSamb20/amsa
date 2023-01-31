import React from "react";
import { Redirect } from "@reach/router";

import "../../utilities.css";
import "./HomePage.css"
import logo from "../../public/logo.png";
const HomePage = (props) => {
    document.title = 'AMSA';
    return props.userId? (<Redirect to={`/profile/${props.userId}`} noThrow/>) : (
        <div className="HomePage-container">
            <div className="HomePage-leftside">
                <div className="HomePage-circle">
                    <img src={logo} />
                </div>
            </div>
            <div className="HomePage-rightside">
                <div className="HomePage-motto">
                    <h2>STAY MOTIVATED</h2>
                    <h2>STAY ACTIVE</h2>
                    <h2>TAKE CONTROL</h2>
                </div>
            </div>
           
        </div>
    );
}

export default HomePage;