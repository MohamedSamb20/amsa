import React from "react";
import "../../utilities.css";
import "./HomePage.css"

const HomePage = () => {
    return (
        <div className="HomePage-container">
            <div className="HomePage-leftside">
                <div className="HomePage-circle">
                    <img src="../../logo.png" />
                </div>
            </div>
            <div className="HomePage-rightside">
                <div className="HomePage-motto">
                    <h2>STAY MOTIVATE</h2>
                    <h2>STAY ACTIVE</h2>
                    <h2>TAKE CONTROL</h2>
                </div>
            </div>
        </div>
    )
}

export default HomePage;