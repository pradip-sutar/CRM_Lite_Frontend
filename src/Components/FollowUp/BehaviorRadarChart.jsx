import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const BehaviorRadarChart = ({ data }) => {
  const chartData = {
    labels: [
      "Extroversion",
      "Impulsiveness",
      "Emotion",
      "Friendness",
      "Creativity",
      "Objectivity",
    ],
    datasets: [
      {
        label: "Behavior Traits",
        data: [
          parseFloat(data.extroversion) || 0,
          parseFloat(data.impulsiveness) || 0,
          parseFloat(data.emotion) || 0,
          parseFloat(data.friendness) || 0,
          parseFloat(data.creativity) || 0,
          parseFloat(data.objectivity) || 0,
        ],
        backgroundColor: "rgba(102, 108, 255, 0.2)",
        borderColor: "#666cff",
        borderWidth: 2,
        pointBackgroundColor: "#666cff",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default BehaviorRadarChart;
