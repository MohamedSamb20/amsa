import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";


const Routine = (props) =>  {
    return(
        <div>
            <p> {props.day} </p>
            <input
                type="text"
                name={props.day}
                value = {props.data[props.day]}
                placeholder='Choose a workout'
                onChange={props.handleInput}
            />
        </div>
    )
}

export default Routine;