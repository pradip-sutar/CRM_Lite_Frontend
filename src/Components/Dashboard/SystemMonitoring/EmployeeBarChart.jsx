import React from 'react';
import ReactApexChart from 'react-apexcharts';

const EmployeeBarChart = ({ series, title, height = 350, categories, }) => {
  const options = {
    chart: {
      height,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}m`,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories,
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: (val) => `${val}m`,
      },
    },
    title: {
      text: title,
      floating: true,
      offsetY: height - 20,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={height} />
    </div>
  );
};

export default EmployeeBarChart;
