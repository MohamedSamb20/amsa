import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";


const Routine = (props) =>  {
    let options = props.options; 
    return(
        <div>
            <p> {props.day} </p>
            <form onChange={props.handleInputChange}>
                {options.map((option) => {
                    return (
                        <>
                            <input type="radio" id={props.day + option} name={props.day} value={option}/>
                            <label for={props.day + option}> {option}</label>
                        </>
                    )
                })}
            </form>
        </div>
    )
}

export default Routine;