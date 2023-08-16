import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {UserData} from './Data';

function BarChart({ chartData }) {
    const config = {
        type: 'bar',
        UserData,
        options: {
          indexAxis: 'y',
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };
  return <Bar data={chartData} />;
}

export default BarChart;