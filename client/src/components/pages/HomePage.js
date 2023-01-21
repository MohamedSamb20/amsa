import React from "react";
import { Redirect } from "@reach/router";

import "../../utilities.css";
import "./HomePage.css"

const HomePage = (props) => {
    return props.userId? (<Redirect to={`/profile/${props.userId}`} noThrow/>) : (
        <div className="HomePage-container">
            <div className="HomePage-leftside">
                <div className="HomePage-circle">
                    <img src="../../logo.png" />
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