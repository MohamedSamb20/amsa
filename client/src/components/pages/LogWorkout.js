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
        sets:0,
        reps:0,        
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
        const body = {userId: props.userId, exercise: data.exercise, sets: data.sets, reps:data.reps};
        console.log(body);
        post('/api/exercise', body).then((res) => console.log(res));
        
        
        console.log('done');
    };
    return (
        <div className="HomePage-container">
        
        <form onSubmit={sendData}>

            <div className='category-container'>
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
            <button type='submit'>Submit</button>
            </div>

        </form>
            

            
        </div>
    )
}

export default LogWorkout;