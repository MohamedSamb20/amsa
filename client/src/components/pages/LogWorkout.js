import React, {useState, useEffect} from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import PostLoginNavbar from "../modules/PostLoginNavbar";
import "./LogWorkout.css"
import "./HomePage.css"
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
const LogWorkout = (props) => {

    document.title = 'Log Workout'
 
    const [data,setData] = useState(
    {
        exercise:'',
        workoutType:'',
        sets:0,
        reps:0,
        weightUsed:0,
        weightUnit:'',
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
      
        post('/api/exercise', body).then((res) => {data.exerciseList.push(res._id)});
     
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
        
        console.log('done');
    };
    const handleSubmit = () => {
        const body = {userId: props.userId, workoutType: data.workoutType, exerciseIds: data.exerciseList, weightUnit:data.weightUnit}
        post('/api/workout', body).then((res)=>console.log(res));
        post('/api/lastworkout', body).then((res)=>console.log(res));
        alert("Workout has been logged");
        (navigate('/'));

    };
    return (
        <div className="LogWorkout-container">
        {props.userId ? 
        
        (
            <div>
            <div className='category-container'>

            <form onSubmit={sendData}>

            

        
            <p>Exercise Type (push,pull, etc)</p>
            <input type='text' name='workoutType' value={data.workoutType}
            onChange={handleInputChange}
            />

            <p>Enter Exercise</p>
            <input type='text' name='exercise' value={data.exercise}
            onChange={handleInputChange}
            />

            <div className='second-box'> 
                <p>Sets</p>
                <input type='number' min='0' name='sets'  value={data.sets} 
                onChange={handleInputChange}
                />   

            </div>

            <div>
                <p>Reps</p>
                <input type='number' min='0' name='reps' value={data.reps}
                onChange={handleInputChange}/> 
            </div>

            <div>
                <p>Weight Used</p>
                <input type="number" min='0' name='weightUsed' value={data.weightUsed}
                onChange={handleInputChange}/> 

                <select name="weightUnit"  value= {data.weightUnit} onChange={handleInputChange}>
                   
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                </select>
                
            </div>

            <button type='submit'>Add to List</button>

            
            

            </form>
            </div>
            
            <div className="table-container">
                <table>
                    <tbody>
                        <tr>
                            <div className='test'>
                                <th>Exercise</th>
                                <th>Sets</th>
                                <th>Reps</th>
                                <th>Weight Used ({data.weightUnit}) </th>
                            </div>
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
            <div className= 'Log-position'>
                <button type='submit' onClick={handleSubmit} >Log Workout</button>
            </div>
        </div>
    )
   
    : <div>logged out</div>}
        
      
        </div>
    )
}

export default LogWorkout;