import React, {useState} from "react";
import { Chart as ChartJS } from 'chart.js/auto';
import {Line} from 'react-chartjs-2';

import {get} from "../../utilities"

import "../../utilities.css";
import "./WeightChart.css"

const WeightChart = (props) => {
    const [dataPoints, setDataPoints] = useState({})
    get("/api/settings", {userId: props.userId}).then((settings)=>{
        const newData = {}
        for(const setting of settings.weightHistory){
            for(const entry of Object.entries(setting)){
                newData[entry[0]] = entry[1];
            }
        }
        console.log(newData)
        setDataPoints(newData);
    })
    const data = {
        labels: ["January"],
        datasets: [
          {
            label: 'Weight (lbs)',
            backgroundColor: 'rgba(182, 198, 0, 1)',
            borderColor: 'rgba(182, 198, 0, 1)',
            data: ["170"],
          }
        ]
      }
    return (<div className="WeightChart-container">
        <Line className="WeightChart-chart"
            data={data}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Weight Progression",
                        color: "white"
                    },
                    legend: {
                        display: false
                    },
                },
                responsive: true,
                scales: {
                    y: {
                        ticks: { color: 'white'}
                    },
                    x: {
                        ticks: { color: 'white'}
                    }
                }
            }}
        />
      </div>);
}

export default WeightChart;