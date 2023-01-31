import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import BioHeight from "./BioHeight.js"
import profileImage from "../../public/profile.png"

import "./Bio.css"


const Bio = (props) =>  {
  const [streak, setStreak] = useState(0);
  const [settings, setSettings] = useState({
    weight : 'Loading...',
    height : 'Loading...',
    heightUnit : '',
    weightUnit : '',
  });
  const [profilePhoto, setProfilePhoto] = useState('');
  useEffect(() => {
    get("/api/settings", {userId :props.userId}).then((setting) => {
      if (setting === false) {setting = {
        weight: '',
        height : '',
        height2:'',
        height1:'',
        heightUnit : 'Not set',
        weightUnit : 'Not set'
      }};
      setSettings(setting);
    });
    get("/api/streak",{userId: props.userId}).then((user) => {
      setStreak(user.streak);
    });
    get("/api/user", {userId: props.userId}).then((user) => {
      setProfilePhoto(user.photo);
    })
  }, []);



  
  return (
    <>
      <img className="Bio-profilePhoto" src={profilePhoto} />
      <p> Weight: {settings.weight} {settings.weightUnit}</p>
      <BioHeight unit={settings.heightUnit} height={settings.height} height1={settings.height1} height2={settings.height2}/>
      <p> Your Workout Streak: {streak}</p>
      {/* <button type='Change' Link = "/settings"> Change Settings </button> */}
    </>
  );
}

export default Bio;