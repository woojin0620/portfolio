import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Moving from './Moving';


function Weather() {

  let cityName = null;
  console.log(cityName);

  const [coords, saveCoords] = useState();
  const [temp, setTemp] = useState();
  const [weather, setWeather] = useState(null);
  const [weatherkr, setWeatherkr] = useState();
  const [name, setName] = useState();
  
    
   function handleGeoSucc(position) {
    console.log(position);
    const latitude = position.coords.latitude;  // 경도  
    const longitude = position.coords.longitude;  // 위도
    const coordsObj = {
      latitude,
      longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
  }
   

  function handleGeoErr(err) {
    console.log("geo err! " + err);
  }

  function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
  }

  function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${'f869c7459b5e02bd2aa484fd07fdd423'}&units=metric&lang=kr`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const name = data.name;
        const temp = data.main.temp;
        const weathers = data.weather[data.weather.length - 1];
        setTemp(temp);
        setWeather(weathers.main);
        setName(name);
        setWeatherkr(weathers.description);
      })
  }

  function getWeatherCity(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${'f869c7459b5e02bd2aa484fd07fdd423'}&units=metric&lang=kr`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const name = data.name;
        const temp = data.main.temp;
        const weathers = data.weather[data.weather.length - 1];
        setTemp(temp);
        setWeather(weathers.main);
        setName(name);
        setWeatherkr(weathers.description);
      })
  }


  useEffect(() => {
    requestCoords();
  }, []);


    return (
        <div className='weather'>
        <motion.div className={weather} initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}>
        <Moving/>
        <Link to='/' className='lkhome'><Button variant='light'>뒤로</Button></Link>
        <div className='wttitle'> 
            <h1 className='abh1'>온도 : {Math.floor(temp)} °C</h1>
            <p>날씨 : {weatherkr}</p>
            <p>{name}</p>

            <Button variant='light' onClick={()=>{requestCoords(); console.log(coords);}}>내위치</Button>
            <Button onClick={()=>{cityName = 'Seoul'; console.log(cityName); getWeatherCity(cityName);}}>서울</Button>
            <Button onClick={()=>{cityName = 'Tokyo'; console.log(cityName); getWeatherCity(cityName);}}>도쿄</Button>
            <Button onClick={()=>{cityName = 'Beijing'; console.log(cityName); getWeatherCity(cityName);}}>베이징</Button>
            <Button onClick={()=>{cityName = 'New york'; console.log(cityName); getWeatherCity(cityName);}}>뉴욕</Button>
            <Button onClick={()=>{cityName = 'London'; console.log(cityName); getWeatherCity(cityName);}}>런던</Button>
            <Button onClick={()=>{cityName = 'Paris'; console.log(cityName); getWeatherCity(cityName);}}>파리</Button>
            


        </div>
        
        </motion.div>
        </div>
        )
    }

export default Weather;