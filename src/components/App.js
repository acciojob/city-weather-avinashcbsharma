import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [weatherData, setWeatherData] = useState('');
  const [temprature,setTemprature] = useState(0);
  const [clouds,setClouds] = useState('');
  const [query, setQuery] = useState('');
  const [timerId, setTimerId] = useState(null);

  const handleInputChange = (e) => {
    clearTimeout(timerId);
    const value = e.target.value;
    const newTimerId = setTimeout(() => setQuery(value), 1000);
    setTimerId(newTimerId);
  };

  useEffect(()=>{
    let fetchdata = async () => {
      try{
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=eb3c3e4f1cd96206492883c9d56e7253` );
        
        setWeatherData(res.data);
        setTemprature(res.data.main.temp);
        setClouds(res.data.weather[0]);      
        console.log("Status", res.status);
      }
      catch(Error){
        console.log("Error in Fetcing: ",Error.message,'\n');
      }
    }
    fetchdata();
  },[query]);
    
  const weatherIcon = `http://openweathermap.org/img/w/${clouds.icon}.png`; 
  let k = parseInt(temprature);
  k = parseInt(( k - 273.15) * 1.8 + 32,0);
   
  return (
    <div id='container'>
      <input className='search' placeholder='Enter a city' onChange={handleInputChange}></input>
     
     { query.length ?
        <div className='weather'>
          <h2>{weatherData.name}</h2>
          <h1>{k} °F</h1>
          <p>{clouds.description}</p> 
          <img src={weatherIcon} alt="Weather icon" /> 
        </div>  :""
      }
    
    </div>
  );
};
