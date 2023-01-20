import React from "react";
import { post } from "../../utilities";
import "../../utilities.css";
import PostLoginNavbar from "../modules/PostLoginNavbar";
import "./LogWorkout.css"

const LogWorkout = () => {
    const [exerciseName, setExericseName] = useState(null);
    const [numSets, setNumSets] = useState();
    const [numReps, setNumReps] = useState();
    return (
        <div className="HomePage-container">
            <PostLoginNavbar />
            <h4>hala madrid</h4>
            <div className='category-container'>
                <p>Select Exercise</p>
            <input type='text' name='exercise'></input>
            <div className='second-box'> 
                <p>Sets</p>
            <input type='text' name='sets'></input>   
               
            </div>

            <div>
            <p>Reps</p>
            <input type='text' name='reps'></input> 
            </div>
            <button onClick={() => {
                // post('/api/exercise', {reps:});
                
            }}>Submit</button>

            </div>
            

            
        </div>
    )
}

export default LogWorkout;