import React, { useState, useEffect } from "react";

import { get, post } from "../../utilities";
import "../../utilities.css";
import "./RoutineComponent.css"


const Routine = (props) =>  {
    let options = props.options; 
    return(
        <div className="RoutineComponent-container">
            <div className="RoutineComponent-label"> 
                <label for={props.day}>{props.day}</label>
            </div>
            <div className="RoutineComponent-dropdown">
                <select onChange={props.handleInputChange} name={props.day}>
                    {options.map((option) => {
                        return (
                            <>
                                <option id={props.day + option}>{option}</option>
                            </>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default Routine;