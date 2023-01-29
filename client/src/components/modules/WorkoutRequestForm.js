import React, { useState, useEffect } from "react";


import { get, post } from "../../utilities";
import "../../utilities.css";
import "./WorkoutRequestForm.css"


const WorkoutRequestForm = (props) =>  {
  const [data, setData] = useState({
    workoutRoutine: '',
    workoutHour: null,
    workoutMinute: null,
    notes: '',
  })
  const sendRequest = (event) => {
    post("/api/workoutrequest", {userId: props.requestee, requester: props.requester, hour: data.workoutHour, minute: data.workoutMinute, routine: data.workoutRoutine, notes: data.notes})
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
            <input type="number" name="workoutHour" placeholder='Hour (24HR)' value={data.workoutTime} onChange={handleInputChange}/>:
            <input type="number" name="workoutMinute" placeholder='Minute' value={data.workoutMinute} onChange={handleInputChange}/>
          </div>
          <div>
            <p>Notes?</p>
            <input type="text" name="notes" placeholder='Enter additional information' value={data.notes} onChange={handleInputChange}/>
          </div>
          <button type="submit">Submit</button>
          <button type='reset'>Close</button>
        </div>
      </form>
    </div>
  );
}

export default WorkoutRequestForm;