import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const WeatherWidget = ({ destination }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  useEffect(() => {
    console.log("API Key:", apiKey);

    const fetchWeather = async () => {
      if (!destination) return;
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${destination}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [destination, apiKey]);

  const renderWeatherInfo = () => {
    if (!weather?.main) {
      return <p>Weather data unavailable</p>;
    }

    return (
      <div>
        <h4>Weather in {destination}</h4>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Condition: {weather.weather[0].description}</p>
      </div>
    );
  };

  return (
    <div className="weather-widget">
      {loading ? <p>Loading weather...</p> : renderWeatherInfo()}
    </div>
  );
};

WeatherWidget.propTypes = {
  destination: PropTypes.string.isRequired,
};

export default WeatherWidget;
