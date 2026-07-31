import React, { useState, useEffect } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
      const data = await response.json();
      setWeatherData(data);
    };

    fetchWeather();
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      {weatherData && <pre>{JSON.stringify(weatherData, null, 2)}</pre>}
    </div>
  );
}

export default App;
