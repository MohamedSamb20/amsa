import React, {useState} from "react";
import "../../utilities.css";
import "./ProfilePage.css"
import Friends from "../modules/FriendsComponent.js"

const ProfilePage = (props) => {
    return (
        <div className="ProfilePage-container">
            <div className="ProfilePage-chart">
                Nothiing
            </div>
            <div className="ProfilePage-progression">
                Insert Progressions
            </div>
            <div className="ProfilePage-bio">
                Insert Bio+Calendar
            </div>
            <div className="ProfilePage-friends">
                <Friends userId = {props.userId} />
            </div>
        </div>
    );
}

export default ProfilePage;