import React, { useState, useEffect } from "react";
import { Router} from "@reach/router";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider} from "@react-oauth/google";
import { navigate } from "@reach/router";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import PreLoginNavbar from "./modules/PreLoginNavbar.js";
import PostLoginNavbar from "./modules/PostLoginNavbar.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import LogWorkout from "./pages/LogWorkout.js";

const GOOGLE_CLIENT_ID = "451813111049-optth6tpncstfk4gp8mshtofm008h353.apps.googleusercontent.com";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
      navigate(`/profile/${user._id}`);
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
    navigate("/");
  };

  

  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {userId ? (<PostLoginNavbar handleLogout={handleLogout}/>) : (<PreLoginNavbar handleLogin={handleLogin}/>)}
      </GoogleOAuthProvider>
      <Router>
        <HomePage exact path="/" handleLogin={handleLogin} userId={userId}/>
        <AboutPage exact path="/about" handleLogin={handleLogin} userId={userId}/>
        <ProfilePage exact path="/profile/:userId" userId={userId}/>
        <NotFound default />
        <LogWorkout path='/logworkout' userId={userId} />
      </Router>
    </>
  );
};

export default App;
