import React from "react";
import {googleLogout } from "@react-oauth/google";
import "../../utilities.css";
import "./PostLoginNavbar.css"

const PostLoginNavbar = (props) => {
    const setProfilePage = ()=>{props.setPage("Profile")};
    return (
        <nav className="Navbar-container">
            <img src="../../public/logo.png" className="Navbar-image"/>
            <div className="Navbar-name">Name</div>
            <button className="Navbar-button" onClick={setProfilePage}>Profile</button>
            <button className="Navbar-button">Log Workout</button>
            <button className="Navbar-button">Edit Stats</button>
            <button className="Navbar-button">Settings</button>
            <button className="Navbar-logout" onClick={() => {
                googleLogout();
                props.handleLogout();
            }}>Logout</button>
        </nav>
    )
}

export default PostLoginNavbar;