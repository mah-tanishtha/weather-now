// src/components/CurrentWeather.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrentWeather = ({ coordinates }) => {
    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        const fetchCurrentWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,wind_speed_10m,wind_direction_10m,wind_gusts_10m`
                );
                console.log('r', response)
                setCurrentWeather(response.data.current); // Fetch current weather data
            } catch (error) {
                console.error('Error fetching current weather data:', error);
            }
        };

        fetchCurrentWeather();
    }, [coordinates]);

    if (!currentWeather) return <p>Loading current weather data...</p>;

    return (
        <div className='d-flex justify-content-center '>
            <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px', width: '400px', borderRadius: '8px' }}>
                <h3>Current Weather</h3>
                <p>🌡️Temperature: {currentWeather.temperature_2m}°C</p>
                <p>🥵Humidity: {currentWeather.relative_humidity_2m}%</p>
                <p>🌧️Precipitation: {currentWeather.precipitation} mm</p>
                <p>☔Rain: {currentWeather.rain} mm</p>
                <p>🌬️Wind Speed: {currentWeather.wind_speed_10m} km/h</p>
                <p>🌪️Wind Direction: {currentWeather.wind_direction_10m}°</p>
                <p>🍃Wind Gusts: {currentWeather.wind_gusts_10m} km/h</p>
                <p>🌻Daylight: {currentWeather.is_day ? ' 🌞Day' : '🌝Night'}</p>
            </div>
        </div>

    );
};

export default CurrentWeather;
