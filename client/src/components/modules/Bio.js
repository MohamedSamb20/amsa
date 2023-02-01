import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import BioHeight from "./BioHeight.js"
import profileImage from "../../public/profile.png"

import "./Bio.css"


const Bio = (props) =>  {
  const [streak, setStreak] = useState(0);
  const [idToUser, setIdToUser] = useState({})
  const [workouts, setWorkouts] = useState([])
  const [settings, setSettings] = useState({
    username: 'Loading...',
    weight : 'Loading...',
    height : 'Loading...',
    heightUnit : '',
    weightUnit : '',
  });
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    get("/api/settings", {userId :props.userId}).then((setting) => {
      if (setting === false) {setting = {
        weight: '',
        height : '',
        height2:'',
        height1:'',
        heightUnit : 'Not set',
        weightUnit : 'Not set',
        username: ''
      }};
      setSettings(setting);
    });
    get("/api/streak",{userId: props.userId}).then((user) => {
      setStreak(user.streak);
    });
    get("/api/user", {userId: props.userId}).then((user) => {
      setUser(user);
    });
    get("/api/plannedworkout", {userId: props.userId}).then((workouts) => {
      setWorkouts(workouts);
    });

    get("/api/friends", {userId: props.userId}).then((friendList)=>{
      return friendList.map(async (friendship) => {
          return get("/api/user", {userId: friendship.friendId}).then((settings) => [friendship.friendId, settings.name])
      })
  }).then(async (prePairing) => {
      const IDToUser = {};
      const pairing = await Promise.all(prePairing);
      for(const pair of pairing){
          IDToUser[pair[0]] = pair[1];
      }
      setIdToUser(IDToUser);
  });
  }, []);



  
  return (
    <div className='bio-container'>
      <img style={{borderRadius:'50%'}}className="Bio-profilePhoto" src={(user)? user.photo: undefined} />
      <p style={{fontSize:'40px', fontFamily: 'Monteserrat', fontWeight:'200px'}}>Welcome back {settings.username ?? user.name}</p>
      <p> Weight: {settings.weight} {settings.weightUnit}</p>
      <BioHeight unit={settings.heightUnit} height={settings.height} height1={settings.height1} height2={settings.height2}/>
      <p> Your Workout Streak: {streak}</p>
      <div className="plannedWorkout">
        <p>Planned workouts:</p>
        {workouts.map((workout) => {
          const time = workout.time.slice(-8, -6)+':'+workout.time.slice(-5, -3);
          return (
            <p>{workout.routine} with {idToUser[workout.workoutBuddy]} at {time}</p>)
        })}
      </div>
      {/* <button type='Change' Link = "/settings"> Change Settings </button> */}
    </div>
  );
}

export default Bio;