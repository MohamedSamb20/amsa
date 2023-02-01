import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import Table from "./Table";


const LastWorkout = (props) => {
    const [exercises, setExercises] = useState({
        exercises: [],
        workoutType: '',
        weights: '',

    });
    useEffect(() => {
        get('/api/workout', {userId: props.userId}).then((ex) => {
            const exercise = {
                exercises: ex.exerciseIds,
                workoutType: ex.workoutType,
                weights: ex.weightUnit,
            };
            setExercises(exercise);
        }
        );
        
    }, [props.userId]);
   

    return (
        <div >
           
        <Table data={exercises.exercises} unit={exercises.weights}/>
        <a href='/history' style={{color:'white', fontWeight:'600', fontFamily:'Montserrat', textDecoration:'underline', textAlign: 'center'}} >Previous Workouts </a>
        </div>
    );

}

export default LastWorkout;