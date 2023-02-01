import React, {useState} from "react";
import "../../utilities.css";
import "./ProfilePage.css"
import Friends from "../modules/FriendsComponent.js"
import Bio from "../modules/Bio.js"
import WeightChart from "../modules/WeightChart.js"
import LastWorkout from "../modules/LastWorkout.js"
// import FriendsPage from "./pages/FriendsPage.js";

const ProfilePage = (props) => {
    document.title = 'Profile'
    return (
        
        <div className="ProfilePage-container">
            
                <div className="ProfilePage-chart">
                    <WeightChart userId = {props.userId}/>
                </div>
                <div className="ProfilePage-progression">
                <div className='progression-title'>Last Workout </div>                    
                <LastWorkout userId= {props.userId}/>
                </div>
                <div className="ProfilePage-bio">
                    <Bio userId = {props.userId}/>
                </div>
                <div className='outershell'>
                    <div className="ProfilePage-friends">
                        <Friends userId = {props.userId} />
                    
                    </div>
                    <a href='/friends' style={{color:'white', fontWeight:'600', fontFamily:'Montserrat', textDecoration:'underline'}} >Manage Friends </a>
                </div>
                
               
        </div>
    );
}

export default ProfilePage;