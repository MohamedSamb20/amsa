import React, { useState, useEffect } from "react";
import {RiSaveFill, RiDeleteBin6Line} from "react-icons/ri";
import {RxReset} from "react-icons/rx";
import {IoIosAddCircle} from "react-icons/io"

import Routine from "../modules/RoutineComponent.js";

import { get, post } from "../../utilities";
import "../../utilities.css";
import "./RoutinePage.css";

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
    console.log(`${name} corresponds to ${value}`);
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
    if (options.includes(newOption)) {
      alert('Already there');
      return('empty')};
    if (options.length === 8) {alert('You can only have 8 options' );
  return('')}
    setOptions((options) => options.concat(newOption));
    setData((prevProps) => ({
      ...prevProps,
      routineOptions: prevProps.routineOptions.concat(newOption),
    }))
    setNewOption('');
    setMessage('Option added!');
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
    <div className="RoutinePage-container">
      <div className="RoutinePage-formcontainer">
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
            <button className="RoutinePage-submit" type="submit"><RiSaveFill /></button>
            <button className="RoutinePage-reset" type="reset"><RxReset /></button>
            {message}
          </div>
        </form>
      </div>
      <div className="RoutinePage-optioncontainer">
        <form onSubmit={handleAbort}>
          <button className="RoutinePage-addoptions" type='submit'><IoIosAddCircle /></button>
          <input className="RoutinePage-optionsinput" type= "text" placeholder='Specify your Option' value={newOption} onChange={handleOptionChange}/>
        </form>
        {options.map((option) => {
          if (option === 'Rest') {return(<p></p>)};
          return(
          <div className="RoutinePage-options">
            <button className="RoutinePage-deleteoptions" name={option} onClick={handleDelete}><RiDeleteBin6Line/></button>
            <p>{option}</p>
          </div>)
        })}
      </div>
    </div>
  );
};

export default RoutinePage;
