// src/services/weatherService.js
export const fetchWeatherData = async (city) => {
  const apiKey = "65db094357e305acee0c3bed5cb5f8c3"; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
