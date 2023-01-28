import React, {useState, useEffect} from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import PostLoginNavbar from "../modules/PostLoginNavbar";
import "./LogWorkout.css"
import "./HomePage.css"
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import Table from '../modules/Table.js';

const History = (props) => {
    document.title = 'History'
    const [allworkouts, setWorkouts] = useState([]);
    const [allDates, setDate] = useState([]);
    
    useEffect(()=>{
        let promises = [];
        get('/api/allworkouts', {userId: props.userId}).then( (exList) => {
            console.log("here");
            console.log(exList);
            Promise.all(exList).then((arr) => {
                console.log("arr", arr);
                setWorkouts(arr.map((obj) => {
                    return obj.exerciseIds;
                }));
                setDate(arr.map((obj) => {
                    return obj.weightUnit; //change
                }));
                console.log('allworkouts', allworkouts);
            })
            
        }

        );
        
    },[props.userId])
    return (

        <div className="HomePage-container">
            All previous workouts will appear here
          
            <div className='rows'>

                {allworkouts.map((workout,i) => {
                    
                    return (
                    <div key={i}>
                        
                        <Table data={workout} unit={allDates[i]}/>
                    </div>
                        
                        );
                })}
            </div>
        </div>

    );

}

export default History;