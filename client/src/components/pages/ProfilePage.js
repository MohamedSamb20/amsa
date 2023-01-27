import React, {useState} from "react";
import "../../utilities.css";
import "./ProfilePage.css"
import Friends from "../modules/FriendsComponent.js"
import Bio from "../modules/Bio.js"
import WeightChart from "../modules/WeightChart.js"
import LastWorkout from "../modules/LastWorkout.js"
const ProfilePage = (props) => {
    document.title = 'Profile'
    return (
        <div className="ProfilePage-container">
            <div className="ProfilePage-chart">
                <WeightChart/>
            </div>
            <div className="ProfilePage-progression">
                Last Workout
                <LastWorkout userId= {props.userId}/>
            </div>
            <div className="ProfilePage-bio">
                <Bio userId = {props.userId}/>
            </div>
            <div className="ProfilePage-friends">
                <Friends userId = {props.userId} />
            </div>
        </div>
    );
}

export default ProfilePage;