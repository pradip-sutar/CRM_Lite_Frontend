import React from "react";
import ReactApexChart from "react-apexcharts";

const StackedBarChart = ({ data }) => {
  if (
    !data ||
    !data.persona_expectations ||
    !data.persona_expectations.category_scores
  ) {
    console.error("Invalid data provided to StackedBarChart:", data);
    return <div>No data available to render the chart.</div>;
  }

  const categoryScores = data.persona_expectations.category_scores;
  const categories = Object.keys(categoryScores);
  const series = [
    {
      name: "Category Scores",
      data: Object.values(categoryScores),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "Conversion Rate Chart",
    },
    xaxis: {
      categories: categories,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val?.toFixed(2) + "%";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ["#FF33A1", "#33FF57", "#3357FF", "#FF33A1", "#FFC733", "#33FFF2"],
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default StackedBarChart;
