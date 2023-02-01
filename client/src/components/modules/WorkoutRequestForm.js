import React, { useState, useEffect } from "react";


import { get, post } from "../../utilities";
import {MdOutlineCancelPresentation} from "react-icons/md";
import {IoSend} from "react-icons/io5";
import "../../utilities.css";
import "./WorkoutRequestForm.css"


const WorkoutRequestForm = (props) =>  {
  const [data, setData] = useState({
    workoutRoutine: '',
    workoutHour: "",
    workoutMinute: "",
    notes: '',
  })
  const sendRequest = (event) => {
    post("/api/workoutrequest", {userId: props.requestee, requester: props.requester, hour: data.workoutHour, minute: data.workoutMinute, routine: data.workoutRoutine, notes: data.notes}).then((res) => {
      props.setFriendsNumber((prevFriendsNumber) => prevFriendsNumber + 1);
    })
    props.setShowForm(false);
  };
  
  const closeForm = (event) => {
    props.setShowForm(false);
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };
  return (
    <div className="WorkoutRequestForm-container">
      <form onSubmit={sendRequest} onReset = {closeForm}>
        <div className="">
          <p>Workout routine?</p>
          <input type="text" name="workoutRoutine" placeholder='Enter a Workout Routine' value={data.workoutRoutine} onChange={handleInputChange}/>
          <div className="second-box">
            <p>Requested time</p>
            <input className="WorkoutRequestForm-hourinput" type="number" min={0} max={23} name="workoutHour" placeholder='Hr (24)' value={data.workoutTime} onChange={handleInputChange}/>:
            <input className="WorkoutRequestForm-minuteinput" type="number" min={0} max={59} name="workoutMinute" placeholder='Min' value={data.workoutMinute} onChange={handleInputChange}/>
          </div>
          <div>
            <p>Notes?</p>
            <input type="text" name="notes" placeholder='Enter additional information' value={data.notes} onChange={handleInputChange}/>
          </div>
          <button className="WorkoutRequestForm-submit" type="submit"><IoSend /></button>
          <button className="WorkoutRequestForm-close" type='reset'><MdOutlineCancelPresentation /></button>
        </div>
      </form>
    </div>
  );
}

export default WorkoutRequestForm;