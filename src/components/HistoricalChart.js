import React from 'react';
import { Line } from 'react-chartjs-2';

const HistoricalChart = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: 'Token Balance',
        data: data.map(entry => parseFloat(entry.balance)),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default HistoricalChart;
