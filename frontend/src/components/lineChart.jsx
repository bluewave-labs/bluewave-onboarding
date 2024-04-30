import React from 'react';
import { Line } from 'react-chartjs-2';

// Defining the data for the chart
const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Views 24 hours',  
      data: [65, 59, 80, 81, 56, 55, 40],  
      fill: false, 
      tension: 0.1 
     }
  ]
};
function LineChart() {
  
  return <Line data={chartData} />;
}
export default LineChart;
