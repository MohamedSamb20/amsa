import React from "react";
import { Link } from "@reach/router";
import {googleLogout } from "@react-oauth/google";
import "../../utilities.css";
import "./PostLoginNavbar.css"

const PostLoginNavbar = (props) => {
    return (
        <nav className="Navbar-container">
            <img className="Navbar-image"/>
            <div className="Navbar-name">Name</div>
            <Link className="Navbar-button" to={`/`}>Profile</Link>
            <Link className="Navbar-button" to="/logworkout">Log Workout</Link>
            <Link className="Navbar-button" to="/stats">Edit Stats</Link>
            <Link className="Navbar-button" to="/settings">Settings</Link>
            <button className="Navbar-logout" to="/" onClick={() => {
                googleLogout();
                props.handleLogout();
            }}>Logout</button>
        </nav>
    )
}

export default PostLoginNavbar;