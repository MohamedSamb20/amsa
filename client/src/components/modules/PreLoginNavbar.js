import React from "react";
import {GoogleLogin} from "@react-oauth/google";
import { Link } from "@reach/router";
import "../../utilities.css";
import "./PreLoginNavbar.css"
import logo from "../../public/logo.png";
const PreLoginNavbar = (props) => {
    return (
        <nav className="Navbar-container">
            {/* <img className="Navbar-image" src={logo}/> make img smaller */}
            <div className="Navbar-name">AMSA</div>
            <Link className="Navbar-home Navbar-button" to="/">Home</Link>
            <Link className="Navbar-about Navbar-button" to="/about">About</Link>
            <GoogleLogin className="Navbar-login Navbar-button" onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
        </nav>
    )
}

export default PreLoginNavbar;