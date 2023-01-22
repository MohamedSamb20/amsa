import React, {useState} from "react";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./ProfilePage.css"

const ProfilePage = (props) => {
    console.log(props.userId);
    return (
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