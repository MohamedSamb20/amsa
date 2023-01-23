import React, {useState, useEffect} from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import PostLoginNavbar from "../modules/PostLoginNavbar";
import "./HomePage.css"

const LogWorkout = (props) => {
    // const [exerciseName, setExericseName] = useState("");
    // const [numSets, setNumSets] = useState(0);
    // const [numReps, setNumReps] = useState(0);
    // useEffect(() => {
    //     get("/api/test").then((res) => console.log(res));
    //     // post("/api/exercise", {exercise: '', sets: 19, reps: 10}).then((res) => console.log(res));
    // }, [])

    const [data,setData] = useState(
    {
        exercise:'',
        workoutType:'',
        sets:0,
        reps:0,
        weightUsed:0,
                
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevProps) => ({
          ...prevProps,
          [name]: value
        }));
        
      };
  
    const sendData = (e) => {
        e.preventDefault();
        const body = {userId: props.userId, exercise: data.exercise, sets: data.sets, reps:data.reps, weightUsed: data.weightUsed};
        console.log(body);
        post('/api/exercise', body).then((res) => console.log(res));
        post('/api/workout', {userId: props.userId, workoutType: data.workoutType}).then((res) => console.log(res));
        
        
        console.log('done');
    };
    const handSubmit = () => {
        
        <Link to={`/profile/${props.userId}`} ></Link>

    };
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
            <button type='submit' onClick={handSubmit} >Log Workout</button>
        </div>
        
            

    )
     
    
    : <div>logged out</div>}
        
        
       
    
            

            
        </div>
    )
}

export default LogWorkout;