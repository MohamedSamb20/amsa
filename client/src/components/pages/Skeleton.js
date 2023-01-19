import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import PreLoginNavbar from "../modules/PreLoginNavbar";
import PostLoginNavbar from "../modules/PostLoginNavbar";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "FILL ME IN";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  const [page, setPage] = useState("Home");
  let currentPage = undefined;
  if(page === "Home"){
    currentPage = (<HomePage />)
  } else if(page === "About"){
    currentPage = (<AboutPage />)
  }
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {userId ? (<PostLoginNavbar handleLogout={handleLogout} />) : (<PreLoginNavbar handleLogin={handleLogin} setPage={setPage} />)}
      {currentPage}
    </GoogleOAuthProvider>
  );
};

export default Skeleton;
