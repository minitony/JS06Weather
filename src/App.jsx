import React, { useState, useEffect } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && <pre>{JSON.stringify(weatherData, null, 2)}</pre>}
    </div>
  );
}

export default App;
