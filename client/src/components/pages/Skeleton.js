import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import PreLoginNavbar from "../modules/PreLoginNavbar";
import PostLoginNavbar from "../modules/PostLoginNavbar";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ProfilePage from "./ProfilePage"

import "../../utilities.css";
import "./Skeleton.css";
import LogWorkout from "./LogWorkout";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "451813111049-optth6tpncstfk4gp8mshtofm008h353.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout, page, setPage}) => {
  let currentPage = undefined;
  if(page === "Home"){
    currentPage = (<HomePage />)
  } else if(page === "About"){
    currentPage = (<AboutPage />)
  } else if(page === "Profile"){
    currentPage = (<ProfilePage />)
  }else if(page === "logworkout"){
    currentPage = (<LogWorkout />)
  }else {
    currentPage = (<div>Error</div>)
  }
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {userId ? (<PostLoginNavbar handleLogout={handleLogout} setPage={setPage}/>) : (<PreLoginNavbar handleLogin={handleLogin} setPage={setPage} />)}
      {currentPage}
    </GoogleOAuthProvider>
  );
};

export default Skeleton;
