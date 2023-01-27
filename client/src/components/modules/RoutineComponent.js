import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";


const Routine = (props) =>  {
    return(
        <div>
            <p> {props.day} </p>
            <form onChange={props.handleInputChange}>
                {props.options.map((option) => {
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