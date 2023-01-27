import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import Table from "./Table";


const LastWorkout = (props) => {
    const [exercises, setExercises] = useState({
        exercises: [],
        workoutType: '',

    });
    useEffect(() => {
        get('/api/workout', {userId: props.userId}).then((ex) => {
            console.log('here');
            console.log(ex);
            const exercise = {
                exercises: ex.exerciseIds,
                workoutType: ex.workoutType
            };
            setExercises(exercise);
        }
        );
        
    }, [props.userId]);
   

    return (
        <div>
           
        <Table data={exercises.exercises} />
        </div>
    );

}

export default LastWorkout;