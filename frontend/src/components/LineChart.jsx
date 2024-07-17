import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SavingsChart = ({ amount, id, cycle_amount, cycle }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Data = await generateChartData(id, cycle_amount, cycle);
        setChartData(Data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, [id, cycle_amount, cycle]);

  const getSavedAmount = async (id) => {
    const response = await axios.get(`http://localhost:3000/dashboard/user/${id}`);
    const user = response.data;
    return user.data.saved_amount;
  };

  const generateChartData = async (id, cycle_amount, cycle) => {
    const saved_amount = await getSavedAmount(id);
    let labels = [];
    let scale;
    switch (cycle) {
      case 'weekly':
        scale = 7;
        break;
      case 'daily':
        scale = 1;
        break;
      case 'monthly':
        scale = 30;
        break;
      default:
        scale = 1;
    }
    let noOfSavingtimes = saved_amount / cycle_amount;
    let savedAmountData = [];
    savedAmountData.push(0);
    for (let i = 1; i <= noOfSavingtimes; i++) {
      savedAmountData.push(cycle_amount * i);
    }

    const noOfTotaltimes = amount / cycle_amount;
    let totalTimeLine = [];
    totalTimeLine.push(`Day ${0}`)
    for (let i = 1; i <= noOfTotaltimes; i++) {
      totalTimeLine.push(`Day ${i * scale }`);
    }

    let totalSavingTime = [];
     totalSavingTime.push(0);
    for (let i = 1; i <= noOfTotaltimes; i++) {
      totalSavingTime.push(cycle_amount * i);
    }

    // Shaded region between first and last saved amount points
    const firstSavedAmount = savedAmountData[0];
    const lastSavedAmount = savedAmountData[savedAmountData.length - 1];

    return {
      labels: totalTimeLine,
      datasets: [
        {
          label: 'Total Amount',
          data: totalSavingTime,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          label: 'Saved Amount',
          data: savedAmountData,
          borderColor: 'rgba(75, 192, 192, 1)', 
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointBorderColor: 'rgba(75, 192, 192, 1)',
          pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
          fill: {
            // Fill between the first and last saved amount points
            target: 'origin',
            above: 'rgb(75, 192, 192, 0.4)', // Color for the shaded region
          },
          spanGaps: true, // Allow shading between gaps in data

        },
      ],
    };
  };

  if (!chartData) return null;

  const options = {
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Change color of x-axis grid lines
        },
        ticks: {
          color: 'white', // Change color of x-axis labels
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Change color of y-axis grid lines
        },
        ticks: {
          color: 'white', // Change color of y-axis labels
        },
      },
    },
    plugins: {
      filler: {
        propagate: true, // Propagate fill to all points
      },
    },
    elements: {
      line: {
        tension: 0.4, // Adjust tension for smoother lines
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default SavingsChart;
