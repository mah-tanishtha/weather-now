// src/components/SearchCity.js
import React, { useState } from 'react';
import axios from 'axios';
import WeatherDisplay from './WeatherDisplay';
import '../styles/style.css'
import SearchIcon from '@mui/icons-material/Search';

const SearchCity = () => {
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&format=json`
      );
      const result = response.data.results?.[0];
      if (result) {
        setCoordinates({ lat: result.latitude, lon: result.longitude });
      } else {
        alert('City not found');
      }
    } catch (error) {
      console.error('Error fetching city coordinates:', error);
    }
  };

  return (
    <div className='searchCity '>
      <h4>Search for a City</h4>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button className="ms-2" onClick={handleSearch} ><SearchIcon/></button>
      {coordinates && <WeatherDisplay coordinates={coordinates} />}
    </div>
  );
};

export default SearchCity;
