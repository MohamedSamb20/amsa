import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "../pages/LogWorkout.css"

const Table = (props) => {

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        console.log("table useeffect", props);
        let promises = [];
        for(let i=0; i<props.data.length; i++){
            promises.push(get('/api/exercise', {_id:props.data[i]}));
        }
        Promise.all(promises).then(arr => {
            setExercises(arr);
            console.log(arr);
        });
    }, [props])
    
    return (
        <div className='table-container'>
        
        <table>
                    <tbody>
                        <tr>
                            
                                <th>Exercise</th>
                                <th>Sets</th>
                                <th>Reps</th>
                                <th>Weight Used (lbs)</th>
                            
                        </tr>
                        {exercises.map(element => {
                            return <tr><td>{element.exercise}</td>
            <td>{element.sets}</td>
            <td>{element.reps}</td>
            <td>{element.weightUsed}</td></tr>
            })}
                    </tbody>
                </table>
                </div>
    );

}
export default Table;