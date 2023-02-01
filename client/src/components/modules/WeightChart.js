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
        const multiplier = settings.weightUnit === 'kg'? 1:2.2;
        for(const setting of settings.weightHistory){
            newData[setting[0]] = setting[1]*multiplier;
        }
        setDataPoints(newData);
    })
    const data = {
        labels: Object.keys(dataPoints),
        datasets: [
          {
            label: `Weight`,
            backgroundColor: 'rgba(182, 198, 0, 1)',
            borderColor: 'rgba(182, 198, 0, 1)',
            data: Object.values(dataPoints),
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