import React, {useState, useEffect} from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import PostLoginNavbar from "../modules/PostLoginNavbar";
import "./HomePage.css"
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

const History = (props) => {
    return (
        <div className="HomePage-container">
        {props.userId ? 
        
        (
            <div>
            <form onSubmit={sendData}>

            <div className='category-container'>

        
            <p>Exercise Type (push,pull, etc)</p>
            <input type='text' name='workoutType' value={data.workoutType}
            onChange={handleInputChange}
            />

            <p>Select Exercise</p>
            <input type='text' name='exercise' value={data.exercise}
            onChange={handleInputChange}
            />

            <div className='second-box'> 
            <p>Sets</p>
            <input type='text' name='sets'  value={data.sets} 
            onChange={handleInputChange}
            />   

            </div>

            <div>
            <p>Reps</p>
            <input type='text' name='reps' value={data.reps}
            onChange={handleInputChange}/> 
            </div>

            <div>
            <p>Weight Used (lbs)</p>
            <input type="text" name='weightUsed' value={data.weightUsed}
            onChange={handleInputChange}/> 
            </div>

            <button type='submit'>Submit</button>

            </div>
            

            </form>
            <button type='submit' onClick={handleSubmit} >Log Workout</button>
        </div>
        
            

    )
     
    
    : <div>logged out</div>}
        
        
       
    
            

            
        </div>
    )
};

export default History;