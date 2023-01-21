import React from "react";
import { Redirect } from "@reach/router";

import "../../utilities.css";
import "./ProfilePage.css"

const ProfilePage = (props) => {
    return props.userId === undefined?(<Redirect to="/"/>) : (
        <div className="ProfilePage-container">
            <div className="ProfilePage-chart">
                Insert Chart
            </div>
            <div className="ProfilePage-progression">
                Insert Progressions
            </div>
            <div className="ProfilePage-bio">
                Insert Bio+Calendar
            </div>
            <div className="ProfilePage-friends">
                Insert Friends
            </div>
        </div>
    );
}

export default ProfilePage;