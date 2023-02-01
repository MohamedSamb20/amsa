import React, {useState, useEffect} from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import PostLoginNavbar from "../modules/PostLoginNavbar";
import "./LogWorkout.css"
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import Table from '../modules/Table.js';
const LogWorkout = (props) => {

    document.title = 'Log Workout'
    const [val, setVal] = useState([]);
    const [options, setOptions] = useState([]);
    const [data,setData] = useState(
    {
        exercise:'',
        workoutType:'',
        sets:0,
        reps:0,
        weightUsed:0,
        weightUnit:'lbs',
        exerciseList: []
                
    });
    const [allExercises, setExercises] = useState([]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevProps) => ({
          ...prevProps,
          [name]: value
        }));
         // alert(options[0]);
        
      };
    useEffect(() => {
    get("/api/routine", { userId: props.userId }).then((routine) => {
        if (routine === false) {
            routine = {
            routineOptions: ['Rest', 'Push', 'Pull', 'Legs'],
            };};
        const optionsOffered = routine.routineOptions.filter((option) => (option !== 'Rest'));
        setOptions(optionsOffered);
        });
    }, []);

    const handleAdd = () => {
        const abc = [...val, []];
        console.log(abc);
        setVal(abc);
    }
    const handleChanges = (onChangeValue,i) => {
        const inputdata = [...val];
        inputdata[i] = onChangeValue.target.value;
        setVal(inputdata);
    }
    const handleDelete = (i) => {
        const deleteVal = [...val];
        deleteVal.splice(i,1);
        setVal(deleteVal);
    }
  
    const sendData = (e) => {
        //adds exercise to table
        e.preventDefault();
        if (data.exercise === '') {
            alert('Enter the exercise name');
            return ('')
        };
        if (data.sets === 0) {
            alert('Enter the number of sets')
            return('')
        };
        if (data.reps === 0) {
            alert('Enter the number of reps')
            return('')
        };
        const body = {userId: props.userId, exercise: data.exercise, sets: data.sets, reps:data.reps, weightUsed: data.weightUsed};
        setData((prevProps) => ({
            ...prevProps,
            sets: 0,
            reps: 0,
            weightUsed:0,
            exercise:'',
          })
        );
        console.log(body);
        setExercises([...allExercises, body]);
      
        post('/api/exercise', body).then((res) => {data.exerciseList.push(res._id)});
     
        console.log(data.exerciseList);
        const formEl = document.querySelector('form');
        const tbodyEl = document.querySelector('tbody');
        const tableEl = document.querySelector('table');

        
        e.preventDefault();
        // let template = `<tr>
        //                     <td>${data.exercise}</td>
        //                     <td>${data.sets}</td>
        //                     <td>${data.reps}</td>
        //                     <td>${data.weightUsed}</td>
        //                 </tr>
        //                 `;
        // tbodyEl.innerHTML += template;
        
        console.log('done');
    };
    const handleSubmit = () => {
        //sends workout to db
        if (data.workoutType === '') {
            alert('Specify the workout type')
            return ('')
        };
        const body = {userId: props.userId, workoutType: data.workoutType, exerciseIds: data.exerciseList, weightUnit:data.weightUnit}
        post('/api/workout', body).then((res)=>console.log(res));
        post('/api/lastworkout', body).then((res)=>console.log(res));
        alert("Workout has been logged");
        (navigate('/'));

    };
    const handleExerciseDelete = (i) => {
        const newVal = [...data.exerciseList];
        const newValue = [...allExercises];
        newVal.splice(i,1);
        newValue.splice(i,1);
        setData((prevProps) => ({
            ...prevProps,
            exerciseList: newVal
          }));
        setExercises(newValue);
    }
    
    return (
        <div className="LogWorkout-container">
        {props.userId ? 
        
        (
            <div>
            <div className='category-container'>

            {/* <form onSubmit={sendData}> */}

            

        
            <p>Workout Type</p>
            <form onChange={handleInputChange}>
                {options.map((option) => {
                    return (
                        <>
                            <input type="radio" id={option} name='workoutType' value={option}/>
                            <label for={option}> {option}</label>
                        </>
                    )
                })}
            </form>

            <p>Exercise</p>
            <input type='text' placeholder ='Enter exercise' name='exercise' value={data.exercise}
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
                <button onClick={()=> handleAdd()}>Add Reps</button>
                    {val.map((reps,i) => {
                        return(
                            <div>
                                <input type='number' min='0' value={reps} onChange={(e)=>handleChanges(e,i)} />
                                <button onClick={()=> handleDelete(i)}>x</button>
                            </div>
                        )
                    })

                    }   

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

            <button type='submit' onClick={sendData}>Add to List</button>

            
            

            {/* </form> */}
            </div>
            
            <div className="table-container">
                <table>
                    <tbody>
                        <tr>
                            
                                <th>Exercise</th>
                                <th>Sets</th>
                                <th>Reps</th>
                                <th>Weight Used ({data.weightUnit}) </th>
                            
                        </tr>
                        {/* <tr> */}
                            {allExercises.map((arr,i) => {
                                return(
                               
                                <tr>
                                    <td>{arr.exercise}</td>
                                    <td>{arr.sets}</td>
                                    <td>{arr.reps}</td>
                                    <td>{arr.weightUsed}</td>
                                    <button onClick={(e) => {handleExerciseDelete(i)}} >Delete Exercise</button>
                                </tr>
                                /* <button type='submit' onClick={handleExerciseDelete(i)}>Delete Exercise</button> */
                             
                          
                                
                               
                                )
                                
                            })}
                            
                            
                            
                            {/* <td>{data.exercise}</td>
                            <td>{data.sets}</td>
                            <td>{data.reps}</td>
                            <td>{data.weightUsed}</td> */}
                        {/* </tr> */}
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