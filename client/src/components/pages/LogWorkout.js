import React, {useState, useEffect} from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import PostLoginNavbar from "../modules/PostLoginNavbar";
import "./HomePage.css"
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
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
        exerciseList: []
                
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
        
        // post('/api/exercise', body).then((res) => {
        //     const newdata = 
        //         {
        //             exercise:data.exercise,
        //             workoutType:data.workoutType,
        //             sets:data.sets,
        //             reps:data.reps,
        //             weightUsed:data.weightUsed,
        //             exerciseList: data.exerciseList + [res._id]
                            
        //         };
        //     setData(newdata);
        // });
        post('/api/exercise', body).then((res) => {data.exerciseList.push(res._id)});
        // data.exerciseList.push(props._id);
        console.log(data.exerciseList);
        const formEl = document.querySelector('form');
        const tbodyEl = document.querySelector('tbody');
        const tableEl = document.querySelector('table');

        
        e.preventDefault();
        let template = `<tr>
                            <td>${data.exercise}</td>
                            <td>${data.sets}</td>
                            <td>${data.reps}</td>
                            <td>${data.weightUsed}</td>
                        </tr>
                        `;
        tbodyEl.innerHTML += template;
        
        // addTable(e);


        // get('/api/exercise', {_id: props._id}).then((res) => data.exerciseList.push(res));
        
        
        console.log('done');
    };
    const handleSubmit = () => {
        post('/api/workout', {workoutType: data.workoutType, exerciseIds: data.exerciseList}).then((res)=>console.log(res));
     
        alert("Workout has been logged");
        (navigate('/'));

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
            <button type='submit' onClick={handleSubmit} >Log Workout</button>
            <div className="table-container">
                <table className='th,td'>
                    <tbody>
                        <tr>
                            <th>Exercise</th>
                            <th>Sets</th>
                            <th>Reps</th>
                            <th>Weight Used (lbs)</th>
                        </tr>
                        <tr>
                            {/* <td>{data.exercise}</td>
                            <td>{data.sets}</td>
                            <td>{data.reps}</td>
                            <td>{data.weightUsed}</td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
   
    : <div>logged out</div>}
        
      
        </div>
    )
}

export default LogWorkout;