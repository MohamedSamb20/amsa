import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";



const Bio = (props) =>  {
  const [settings, setSettings] = useState({
    weight : 100,
    height :180,
    heightUnit : 'cm',
    weightUnit : 'kg',
  });
  console.log('Goooo')
  useEffect(() => {
    get("/api/settings", {userId :props.userId}).then((setting) => {
      setSettings(setting);
    });
    console.log('Nope')
  }, []);



  
  return (
    <>
      <p> Weight: {settings.weight} {settings.weightUnit}</p>
      <p> Height: {settings.height} {settings.heightUnit}</p>
      <p> Today's Workout: No idea bro</p>
      <p> Your Workout Streak: 0</p>
      <button type='Change' Link = "/settings"> Change Settings </button>
    </>
  );
}

export default Bio;