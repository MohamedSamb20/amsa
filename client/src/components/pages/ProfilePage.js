import React, {useState} from "react";

import WeightChart from "../modules/WeightChart";

import "../../utilities.css";
import "./ProfilePage.css"

const ProfilePage = (props) => {
    return (
        <div className="ProfilePage-container">
            <div className="ProfilePage-chart">
                <WeightChart />
            </div>
            <div className="ProfilePage-progression">
                Last Workout + Date
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