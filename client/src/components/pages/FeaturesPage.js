import React from "react";
import { Redirect } from "@reach/router";

import "../../utilities.css";
import "./FeaturesPage.css";

const FeaturesPage = (props) => {
    document.title = 'Features'
    return (<div className="FeaturesPage-container">
           
            <h1>Features</h1>
            <ul>
                <li>Log completed workouts</li>
                <li>Find friends who are working out same body</li>
                <li>Track workout and weight progression</li>
                <li>See your friends workout streaks</li>
                <li>Much More</li>
            </ul>
        </div>
    );
}

export default FeaturesPage;