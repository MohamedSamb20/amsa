import React from "react";
import {GoogleLogin} from "@react-oauth/google";
import { Link } from "@reach/router";
import "../../utilities.css";
import "./PreLoginNavbar.css"
import logo from "../../public/logo.png";
import { navigate } from "@reach/router";
const PreLoginNavbar = (props) => {
    const goToHomePage = (event) => {
        navigate("/");
    }
    return (
        <nav className="Navbar-container">
            <img className="Navbar-image" src={logo}/>
            <div className="Navbar-name" onClick={goToHomePage}>amsa</div>
            
            <Link className="Navbar-home Navbar-button" to="/">Home</Link>
            <Link className="Navbar-about Navbar-button" to="/about">About</Link>
            <GoogleLogin className="Navbar-login Navbar-button" onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
        </nav>
    )
}

export default PreLoginNavbar;