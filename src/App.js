import React, { useState, useEffect } from "react";
import "./App.css";

console.log(process.env);

const apiUrlBarcelona = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&appid=${process.env.REACT_APP_APIKEY}`;
const apiUrlBerlin = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=${process.env.REACT_APP_APIKEY}`;

function App() {
  let [weather, setWeather] = useState({});
  let [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    // call the api
    // wait until we get the api call coming back with smth
    // store the api result in our state

    fetch(apiUrlBarcelona)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setApiLoaded(true);
      });
  }, []);

  const handleApiCall = () => {
    fetch(apiUrlBerlin)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setApiLoaded(true);
      });
  };

  return (
    <div className="App">
      <h1>My weather app</h1>
      {apiLoaded ? (
        <>
          <h2>Weather in Barcelona</h2>
          <p>Temperature: {weather.main.temp}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>Status: {weather.weather[0].description}</p>
        </>
      ) : (
        <h2>Loading weather...</h2>
      )}
      <p>
        Do you want to know the weather in Berlin?{" "}
        <button onClick={handleApiCall}>Click here!</button>
      </p>
    </div>
  );
}

export default App;
