import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './LineChart.css'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SavingsChart = ({ reward,amount, id, cycle_amount, cycle }) => {
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
    const response = await axios.get(`https://goalguardian-backend.onrender.com/dashboard/user/${id}`);
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
    let savedAmountwithOutRewards=[];
    savedAmountwithOutRewards.push(0);
    let savedAmountData = [];
    savedAmountData.push(0);
    for (let i = 1; i <= noOfSavingtimes; i++) {
      savedAmountData.push(cycle_amount * i);
    }

    const noOfTotaltimes = amount / cycle_amount;
    let totalTimeLine = [];
    totalTimeLine.push(`${0}`)
    for (let i = 1; i <= noOfTotaltimes; i++) {
      totalTimeLine.push(`${i * scale }`);
      if(i<=noOfTotaltimes/2)savedAmountwithOutRewards.push(cycle_amount*i);
      else savedAmountwithOutRewards.push(0.9*cycle_amount*i);
    }

    let totalSavingTime = [];
     totalSavingTime.push(0);
    for (let i = 1; i <= noOfTotaltimes; i++) {
      totalSavingTime.push(cycle_amount * i);
    }

    return {
      labels: totalTimeLine,
      datasets: [
        {
          label: 'Saving Journey',
          data: totalSavingTime,
          borderColor: 'rgba(255, 99, 132, 0.8)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderDash: [5, 5], 
          pointRadius: 0, 
          pointHoverRadius: 0, 
        },
        {
          label: 'Saved Amount',
          data: savedAmountData,
          borderColor: 'rgba(255, 61, 0, 5)', 
          pointBackgroundColor: 'rgba(255, 61, 0, 5)',
          pointBorderColor: 'rgba(255, 61, 0, 5)',
          pointHoverBackgroundColor: 'rgba(255, 61, 0, 5)',
          pointHoverBorderColor: 'rgba(255, 61, 0, 5)',
          fill: {
            target: 'origin',
            above: 'rgb(75, 192, 192)',
          },
          spanGaps: true,
        },
        {
          label: 'Saved Amount without Rewards',
          data: savedAmountwithOutRewards,
          borderColor: 'rgba(57,255,20, 0.8)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderDash: [5, 5], 
          pointRadius: 0, 
          pointHoverRadius: 0, 
        },
      ],
    };
  };

  if (!chartData) return null;

  const options = {
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
        title:{
          display: true,
          text: 'Days',
          color :'orange'
      }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
        title:{
          display: true,
          text: 'Amount (in Rs)',
          color :'orange'

      }
      },
    },
    plugins: {
      filler: {
        propagate: true,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return <Line  data={chartData} options={options} />;
};

export default SavingsChart;
