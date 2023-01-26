import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./AboutPage.css";
import Routine from "../modules/RoutineComponent.js";

const RoutinePage = (props) => {
    document.title = 'Routine';
    const [message, setMessage] = useState('')
    const listOfWeeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [data, setData] = useState({
        userId : props.userId,
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday : '',
        Saturday: '',
        Sunday: ''
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevProps) => ({
          ...prevProps,
          [name]: value,
        }));
      };

    const sendData = ((e) => {
        e.preventDefault();
        const body = data;
        post("/api/routine", body).then((res) => console.log(res));
        setMessage('Routine saved!')
    })

    return(
    <div className="HomePage-container">
      <form onSubmit={sendData}>
      {listOfWeeks.map((day) => {
                return(
                    <Routine 
                    day = {day}  
                    setData = {setData} 
                    data = {data}
                    handleInput={handleInputChange}/>
                )
                })}
          <button type="submit">Save</button>
          {message}
      </form>
    </div>
    )
    
}

export default RoutinePage;