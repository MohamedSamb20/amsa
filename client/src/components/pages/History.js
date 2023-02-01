import React, {useState, useEffect} from "react";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./History.css"
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import Table from '../modules/Table.js';

const History = (props) => {
    document.title = 'History'
    const [allworkouts, setWorkouts] = useState([]);
    const [allDates, setDate] = useState([]);
    const [allUnits, setUnits] = useState([]);
    
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
                setUnits(arr.map((obj) => {
                    return obj.weightUnit; //change
                }));
                setDate(arr.map((obj) => {
                    return obj.timestamp; //change
                }));
                console.log('allworkouts', allworkouts);
            })
            
        }

        );
        
    },[props.userId])
    return (

        <div className="HistoryPage-container">
            All previous workouts will appear here
          
            <div className='rows'>

                {allworkouts.map((workout,i) => {
                    const date = `${allDates[i]}`

                    return (
                    <div key={i}>
                        <p>{date.slice(0,10)}</p>
                        <Table data={workout} unit={allUnits[i]}/>
                    </div>
                        
                        );
                })}
            </div>
        </div>

    );

}

export default History;