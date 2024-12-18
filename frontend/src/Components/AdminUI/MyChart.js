import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register all chart.js components globally
Chart.register(...registerables);

const MyChart = () => {
  // Data for the main chart (product stock percentage)
  const productStockData = {
    labels: ['In Stock', 'Out of Stock', 'Reserved'],
    datasets: [
      {
        label: 'Product Stock Percentage',
        data: [60, 25, 15], // Example data in percentages
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

  // Data for other percentage charts (examples)
  const salesPerformanceData = {
    labels: ['Sales Target Achieved', 'Sales Remaining'],
    datasets: [
      {
        label: 'Sales Performance',
        data: [70, 30], // Example data in percentages
        backgroundColor: ['#4BC0C0', '#FF9F40'],
        hoverOffset: 4,
      },
    ],
  };

  const customerSatisfactionData = {
    labels: ['Satisfied Customers', 'Unsatisfied Customers'],
    datasets: [
      {
        label: 'Customer Satisfaction',
        data: [85, 15], // Example data in percentages
        backgroundColor: ['#9966FF', '#FF6384'],
        hoverOffset: 4,
      },
    ],
  };

  // Custom plugin to add a background image to the chart
  const image = new Image();
  image.src = 'https://www.chartjs.org/img/chartjs-logo.svg';

  const customBackgroundPlugin = {
    id: 'customCanvasBackgroundImage',
    beforeDraw: (chart) => {
      if (image.complete) {
        const ctx = chart.ctx;
        const { top, left, width, height } = chart.chartArea;
        const x = left + width / 2 - image.width / 2;
        const y = top + height / 2 - image.height / 2;
        ctx.drawImage(image, x, y);
      } else {
        image.onload = () => chart.draw();
      }
    },
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
      <div style={{ width: '300px', height: '300px' }}>
        <h3>Product Stock</h3>
        <Doughnut data={productStockData} options={options} plugins={[customBackgroundPlugin]} />
      </div>

      <div style={{ width: '300px', height: '300px' }}>
        <h3>Sales Performance</h3>
        <Doughnut data={salesPerformanceData} options={options} />
      </div>

      <div style={{ width: '300px', height: '300px' }}>
        <h3>Customer Satisfaction</h3>
        <Doughnut data={customerSatisfactionData} options={options} />
      </div>
    </div>
  );
};

export default MyChart;