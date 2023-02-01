import React from "react";
import { Link } from "@reach/router";
import {googleLogout } from "@react-oauth/google";
import logo from "../../public/logo.png";

import "../../utilities.css";
import "./PostLoginNavbar.css"

const PostLoginNavbar = (props) => {
    return (
        <nav className="Navbar-post-container">
            <img className="Navbar-post-image" src={logo}/>
            <div className="Navbar-post-name">amsa</div>
            <Link className="Navbar-post-button" to={`/`}>Profile</Link>
            <Link className="Navbar-post-button" to="/logworkout">Log Workout</Link>

            <Link className="Navbar-post-button" to="/history">History</Link>

            <Link className="Navbar-post-button" to="/routine">Routine</Link>


            <Link className="Navbar-button" to="/settings">Settings</Link>
            <Link className="Navbar-button" to="/friends">Friends</Link>
            <Link className="Navbar-button" to="/about">About</Link>
            <button style={{margin:'13px',padding:'10px'}}className="button is-danger is-outlined is-rounded is-small" to="/" onClick={() => {

                googleLogout();
                props.handleLogout();
            }}>Logout</button>
        </nav>
    )
}

export default PostLoginNavbar;