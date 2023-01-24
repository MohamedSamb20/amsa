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
        exerciseList:[String]
                
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevProps) => ({
          ...prevProps,
          [name]: value
        }));
        
      };
      const addTable = (e) => {
        let btnAdd = document.querySelector('button');
        let table = document.querySelector('table');

        let exerciseInput = document.querySelector('#exercise');
        let setsInput = document.querySelector('#sets');
        let repsInput = document.querySelector('#reps');
        let weightsInput = document.querySelector('#weightUsed');

        btnAdd.addEventListener(e, () => {
            let exercise = exerciseInput.value;
            let sets = setsInput.value;
            let reps = repsInput.value;
            let weight = weightsInput.value;

            let template = `<tr>
                                <td>${exercise}</td>
                                <td>${sets}</td>
                                <td>${reps}</td>
                                <td>${weight}</td>
                            </tr>
                            `;
            table.innerHTML += template;
        });




      };
  
    const sendData = (e) => {
        e.preventDefault();
        const body = {userId: props.userId, exercise: data.exercise, sets: data.sets, reps:data.reps, weightUsed: data.weightUsed};
        console.log(body);
        
        post('/api/exercise', body).then((res) => data.exerciseList.push(res._id));
        // data.exerciseList.push(props._id);
        console.log(data.exerciseList);
        addTable(e);


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
                <table>
                    <tbody>
                        <tr>
                            <th>Exercise</th>
                            <th>Sets</th>
                            <th>Reps</th>
                            <th>Weight Used (lbs)</th>
                        </tr>
                        <tr>
                            <td>{data.exercise}</td>
                            <td>4</td>
                            <td>5</td>
                            <td>135</td>
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