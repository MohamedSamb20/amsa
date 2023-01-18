import React from "react";
import {GoogleLogin, googleLogout} from "@react-oauth/google";
import "../../utilities.css";
import "./PreLoginNavbar.css"

const PreLoginNavbar = (handleLogin) => {
    return (
        <nav className="Navbar-container">
            <img className="Navbar-image" src="../../public/logo.png"/>
            <div className="Navbar-name">NEEDNAME</div>
            <button className="Navbar-home Navbar-button">Home</button>
            <button className="Navbar-about Navbar-button">About</button>
            <GoogleLogin className="Navbar-login Navbar-button" onSuccess={handleLogin} onError={(err) => console.log(err)} />
        </nav>
    )
}

export default PreLoginNavbar;