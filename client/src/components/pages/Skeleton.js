import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import PreLoginNavbar from "../modules/PreLoginNavbar";
import PostLoginNavbar from "../modules/PostLoginNavbar";
import HomePage from "./HomePage";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "FILL ME IN";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  let currentPage = (<HomePage />);
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {userId ? (<PostLoginNavbar handleLogout={handleLogout}/>) : (<PreLoginNavbar handleLogin={handleLogin}/>)}
      {currentPage}
    </GoogleOAuthProvider>
  );
};

export default Skeleton;
