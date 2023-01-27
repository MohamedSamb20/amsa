import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./AboutPage.css";
import Routine from "../modules/RoutineComponent.js";

const RoutinePage = (props) => {
  document.title = "Routine";
  const [message, setMessage] = useState("");
  const listOfWeeks = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const options = ['Push', 'Pull', 'Legs', 'Rest'];
  const [data, setData] = useState('');
  const [prev, setPrev] = useState('');
  useEffect(() => {
    get("/api/routine", { userId: props.userId }).then((routine) => {
      if (routine === false) {
        routine = {
          userId: props.userId,
          Monday: "Rest",
          Tuesday: "Rest",
          Wednesday: "Rest",
          Thursday: "Rest",
          Friday: "Rest",
          Saturday: "Rest",
          Sunday: "Rest"
        };}
      setData(routine);
      setPrev(routine);
      listOfWeeks.map((day) => {
        document.getElementById(day + routine[day]).checked = true;
      });
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const sendData = (e) => {
    e.preventDefault();
    const body = data;
    post("/api/routine", body).then((res) => console.log(res));
    setMessage("Routine saved!");
  };

  return (
    <div className="HomePage-container">
      <form onSubmit={sendData}>
        {listOfWeeks.map((day) => {
          return (
            <Routine 
            options = {options}
            day={day} 
            handleInputChange={handleInputChange} />
          );
        })}
        <button type="submit">Save</button>
        {message}
      </form>
    </div>
  );
};

export default RoutinePage;
