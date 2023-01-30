import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./AboutPage.css";
import Routine from "../modules/RoutineComponent.js";

const RoutinePage = (props) => {
  document.title = "Routine";
  const [message, setMessage] = useState("");
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [newOption, setNewOption] = useState('');
  const [options, setOptions] = useState(['Rest', 'Push', 'Pull', 'Legs']);
  const [data, setData] = useState('');
  const [prev, setPrev] = useState('');
  useEffect(() => {
    get("/api/routine", { userId: props.userId }).then((routine) => {
      if (routine === false) {
        routine = {
          userId: props.userId,
          routineOptions: options,
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
      setOptions(routine.routineOptions)
      weekDays.map((day) => {
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
    setPrev(data);
    setOptions(data.routineOptions);
    const body = data;
    post("/api/routine", body).then((res) => console.log(res));
    setMessage("Routine saved!");
  };

  const handleReset = (event) => {
    setData(prev);
    setOptions(prev.routineOptions);
    setMessage('Routine reset!');
    weekDays.map((day) => {
      document.getElementById(day + prev[day]).checked = true;
    });
  }
  const handleAbort = (e) => {
    e.preventDefault();
    setOptions((options) => options.concat(newOption));
    setData((prevProps) => ({
      ...prevProps,
      routineOptions: prevProps.routineOptions.concat(newOption),
    }))
    setMessage('Option added!')
  };

  const handleDelete = (event) => {
    const {name} = event.target;
    const newOptions = options.filter((option) => (option !== name));
    const newData = {
      userId: props.userId,
      routineOptions: newOptions,
    };
    weekDays.map((day) => {
      if (data[day] === name) {
        newData[day] = 'Rest';
        document.getElementById(day + 'Rest').checked = true;
      } else {
        newData[day] = data.day;
      };
    });
    setOptions(newOptions);
    setData(newData);
    setMessage('Option deleted!')
  };

  const handleOptionChange = (event) => {
    const {value} = event.target;
    setNewOption(value);
  }

  return (
    <div className="HomePage-container">
      <form onSubmit={sendData} onReset={handleReset} onAbort={handleAbort} >
        <div className="category-container">
          {weekDays.map((day) => {
            return (
              <Routine 
              options = {options}
              day={day} 
              handleInputChange={handleInputChange}/>
            );
          })}
          <button type="submit">Save</button>
          <button type="reset">Reset</button>
          {message}
        </div>
      </form>
      <form onSubmit={handleAbort}>
          <button type='submit'>+Add Option</button>
          <input type= "text" placeholder='Specify your Option' onChange={handleOptionChange}/>
      </form>
      <div>
        {options.map((option) => {
          if (option === 'Rest') {return(<p>{option}</p>)};
          return(
          <div>
            <p>{option}</p>
            <button name={option} onClick={handleDelete}>Delete Option</button>
          </div>)
        })}
      </div>
    </div>
  );
};

export default RoutinePage;
