import React, { useState, useEffect } from "react";


import { get, post } from "../../utilities";
import "../../utilities.css";
import "./WorkoutRequestForm.css"


const WorkoutRequestPopup = (props) =>  {
  const acceptWorkout = (event) => {
    const promise1 = post("/api/plannedworkout", {userId: props.userId, buddy: props.requester, time: props.time, routine: props.routine, notes: props.notes});
    const promise2 =post("/api/plannedworkout", {userId: props.requester, buddy: props.userId, time: props.time, routine: props.routine, notes: props.notes});
    const promise3 = post("/api/removeworkoutrequest", {userId: props.userId, requester: props.requester, time: props.time, routine: props.routine, notes: props.notes});
    Promise.all([promise1, promise2, promise3]).then(() =>{
      props.setFriendsNumber((prevFriendsNumber) => prevFriendsNumber + 1);
    })
    props.setShowPopup(false);
  };
  const declineWorkout = (event) => {
    post("/api/removeworkoutrequest", {userId: props.userId, requester: props.requester, time: props.time, routine: props.routine, notes: props.notes}).then((workout) => {
      props.setFriendsNumber((prevFriendsNumber) => prevFriendsNumber + 1);
    })
    props.setShowPopup(false);
  }
  const closeForm = (event) => {
    props.setShowPopup(false);
  }
  return (
    <div className="WorkoutRequestPopup-container">
      <div>
        From: {props.requesterName}
      </div>
      <div>
        Time: {props.time}
      </div>
      <div>
        Routine: {props.routine}
      </div>
      <div>
        Notes: {props.notes}
      </div>
      <button onClick={acceptWorkout}>Accept</button>
      <button onClick={declineWorkout}>Decline</button>
      <button onClick={closeForm}>Close</button>
    </div>
  );
}

export default WorkoutRequestPopup;