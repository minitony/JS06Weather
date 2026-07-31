import React, { useState, useEffect } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=${unitSystem}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to fetch weather data');
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
  }, [unitSystem]);

  const toggleUnit = () => {
    setUnitSystem(prev => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Weather App</h1>
      <button onClick={toggleUnit} style={{ marginBottom: '10px', padding: '5px 10px' }}>
        Switch to {unitSystem === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {weatherData && (
        <div style={{ marginTop: '20px' }}>
          <h2>{weatherData.name}</h2>
          <p>
            <strong>
              {Math.round(weatherData.main.temp)}°{(unitSystem === 'metric' ? 'C' : 'F')}
            </strong>
          </p>
          <p>{weatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            style={{ width: '100px', height: '100px' }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
