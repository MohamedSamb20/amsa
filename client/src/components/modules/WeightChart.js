import React from "react";
import { Chart as ChartJS } from 'chart.js/auto';
import {Line} from 'react-chartjs-2';

import "../../utilities.css";
import "./WeightChart.css"

const WeightChart = (props) => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar',
                 'Apr', 'May'],
        datasets: [
          {
            label: 'Weight (lbs)',
            backgroundColor: 'rgba(182, 198, 0, 1)',
            borderColor: 'rgba(182, 198, 0, 1)',
            data: [210, 205, 194, 197, 190]
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