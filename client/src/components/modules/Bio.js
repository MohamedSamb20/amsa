import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";



const Bio = (props) =>  {
  const [settings, setSettings] = useState({
    weight : 'Loading...',
    height : 'Loading...',
    heightUnit : '',
    weightUnit : '',
  });
  useEffect(() => {
    get("/api/settings", {userId :props.userId}).then((setting) => {
      if (setting === false) {setting = {
        weight: 'Not set',
        height : 'Not set',
        heightUnit : '',
        weightUnit : ''
      }};
      setSettings(setting);
    });
  }, []);



  
  return (
    <>
      <p> Weight: {settings.weight} {settings.weightUnit}</p>
      <p> Height: {settings.height} {settings.heightUnit}</p>
      <p> Your Workout Streak: 0</p>
      {/* <button type='Change' Link = "/settings"> Change Settings </button> */}
    </>
  );
}

export default Bio;