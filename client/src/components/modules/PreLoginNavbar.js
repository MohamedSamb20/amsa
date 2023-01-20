import React from "react";
import {GoogleLogin, googleLogout} from "@react-oauth/google";
import "../../utilities.css";
import "./PreLoginNavbar.css"

const PreLoginNavbar = (props) => {
    const setHomePage = ()=>{props.setPage("Home")};
    const setAboutPage = ()=>{props.setPage("About")};
    return (
        <nav className="Navbar-container">
            <img className="Navbar-image" src="../../public/logo.png"/>
            <div className="Navbar-name">NEEDNAME</div>
            <button className="Navbar-home Navbar-button" onClick={setHomePage}>Home</button>
            <button className="Navbar-about Navbar-button" onClick={setAboutPage}>About</button>
            <GoogleLogin className="Navbar-login Navbar-button" onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
        </nav>
    )
}

export default PreLoginNavbar;