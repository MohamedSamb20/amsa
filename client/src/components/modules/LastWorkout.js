import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";


const LastWorkout = (props) => {
    const [exercises, setExercises] = useState({
        exercises: [],
        workoutType: '',

    });
    useEffect(() => {
        get('/api/workout', {userId: props.userId}).then((ex) => {
            console.log(ex);
            const exercise = {
                exercises: ex.exerciseIds,
                workoutType: ex.workoutType
            };
            setExercises(exercise);
        }
        );
    });

    return (
        <div>
        {JSON.stringify(exercises.exercises)}
        {exercises.workoutType}
        </div>
    );

}

export default LastWorkout;