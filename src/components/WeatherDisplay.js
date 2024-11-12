// 



// src/components/WeatherDisplay.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import '../styles/style.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CurrentWeather from './CurrentWeather';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherDisplay = ({ coordinates }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [chartDisplay, setChartDisplay] = useState(false)
  const [currentWeather, setCurrentWeather] = useState(false)

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
        );

        setWeatherData(response.data.daily);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [coordinates]);

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  if (!weatherData) return <p>Loading weather data...</p>;

  // Prepare data for the line chart
  const labels = weatherData.time.map(date => getDayOfWeek(date)); // Map dates to days of the week
  const maxTemps = weatherData.temperature_2m_max; // Max temperatures for the week
  const minTemps = weatherData.temperature_2m_min; // Min temperatures for the week

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Max Temperature (°C)',
        data: maxTemps,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',

      },
      {
        label: 'Min Temperature (°C)',
        data: minTemps,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '7-Day Temperature Forecast',

      },
    },
  };

  const handleChartDisplay = () => {
    setChartDisplay(!chartDisplay)
  }

  const handleCurrentWeatherDisplay = () => {
    setCurrentWeather(!currentWeather)
  }

  return (
    <div>
      <div className='weather-heading-container d-flex justify-content-center mt-2'>
        <h3 className=''>7-Day Weather Forecast</h3>
        <button className='ms-3 text-primary ' onClick={() => handleChartDisplay()}>Show Chart</button>
        <button className='ms-3 text-primary' onClick={() => handleCurrentWeatherDisplay()}>Current Weather</button>
      </div>

      {/* Display weather data in cards */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '20px', marginBottom: "20px" }}>
        {weatherData.time.map((date, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <span style={{ fontSize: '20px', fontWeight: 500 }}>{date}</span>
            <br />
            <span className='text-secondary'>{getDayOfWeek(date)}:</span>
            <br />
            🌤️Max Temp: {weatherData.temperature_2m_max[index]}°C
            <br />
            🌫️Min Temp: {weatherData.temperature_2m_min[index]}°C
            <br />
            🌧️ Precipitation: {weatherData.precipitation_sum[index]} mm
          </div>
        ))}
      </div>

      {/* to display current weather */}

      {
        currentWeather ? <CurrentWeather coordinates={coordinates} /> : ''
      }

      {/* to display Line Chart */}
      {
        chartDisplay ? <Line style={{ marginTop: '20px' }} data={chartData} options={options} /> : ''
      }



    </div>
  );
};

export default WeatherDisplay;

