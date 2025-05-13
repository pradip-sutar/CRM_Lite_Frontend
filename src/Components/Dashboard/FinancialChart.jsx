import React from 'react';
import Chart from 'react-apexcharts';

const FinancialGraph = () => {
  const options = {
    series: [
      {
        name: 'Desktops',
        data: [10, 41, 35, 51],
      },
    ],
    chart: {
      height: 50,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  };

  return (
   <>
      
       
        {/* <div className="card-body"> */}
          <Chart options={options} series={options.series} type="line" height={350} />
        {/* </div> */}
     
        </>
  );
};

export default FinancialGraph;
