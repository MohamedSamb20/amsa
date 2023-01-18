import React from "react";
import {googleLogout } from "@react-oauth/google";
import "../../utilities.css";

const PostLoginNavbar = (handleLogout) => {
    return (
        <nav>
            <img />
            <div>Name</div>
            <button>Profile</button>
            <button>Log Workout</button>
            <button>Edit Stats</button>
            <button>Settings</button>
            <button onClick={() => {
                googleLogout();
                handleLogout();
            }}>Logout</button>
        </nav>
    )
}

export default PostLoginNavbar;