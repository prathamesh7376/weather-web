import React, { useState } from "react";
import { fetchWeatherData } from "../service/weatherService";
import Header from "./Header";
import Footer from "./Footer";
import Marquee from "./Marquee";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError(""); // Reset error message
    try {
      const data = await fetchWeatherData(city);
      if (data.cod === 404 || data.cod === "404") {
        setError("City not found. Please try again.");
        setWeather(null); // Clear previous weather data
      } else if (data.cod === "error" || data.cod >= 400) {
        setError(
          data.message || "Failed to fetch weather data. Please try again."
        );
        setWeather(null); // Clear previous weather data
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setWeather(null); // Clear previous weather data
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 flex flex-col">
      <Header />
      <Marquee />
      <div className="flex-1 flex items-center justify-center px-2">
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Global Weather App
          </h1>
          <div className="flex flex-col md:flex-row items-center mb-6">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter nearest city"
              className="p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 mb-2 md:mb-0 md:mr-2"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            >
              <strong> Search </strong>
            </button>
          </div>
          {error && (
            <h1 className="text-red-500 text-xl text-center mb-4">
              Oops! For the entered city we currently do not have any data.
              Sorry for the inconvenience.
            </h1>
          )}
          {weather && (
            <div className="bg-gray-100 p-6 rounded-md shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {weather.name ?? "N/A"}, {weather.sys?.country ?? "N/A"}
                  </h2>
                  <p className="text-lg text-gray-700">
                    Coordinates: {weather.coord?.lat ?? "N/A"},{" "}
                    {weather.coord?.lon ?? "N/A"}
                  </p>
                  <p className="text-lg text-gray-700">
                    Weather: {weather.weather?.[0]?.main ?? "N/A"} -{" "}
                    {weather.weather?.[0]?.description ?? "N/A"}
                  </p>
                </div>
                <div className="rounded-full border-2 border-gray-300 overflow-hidden">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}.png`}
                    alt="Weather Icon"
                    className="w-16 h-16"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border p-4 rounded-lg bg-white">
                  <p className="text-lg text-gray-700">
                    Temperature: {weather.main?.temp ?? "N/A"}°C (Feels like:{" "}
                    {weather.main?.feels_like ?? "N/A"}°C)
                  </p>
                  <p className="text-lg text-gray-700">
                    Min Temperature: {weather.main.temp_min ?? "N/A"}°C
                  </p>
                  <p className="text-lg text-gray-700">
                    Max Temperature: {weather.main.temp_max ?? "N/A"}°C
                  </p>
                  <p className="text-lg text-gray-700">
                    Humidity: {weather.main?.humidity ?? "N/A"}%
                  </p>
                </div>
                <div className="border p-4 rounded-lg bg-white">
                  <p className="text-lg text-gray-700">
                    Pressure: {weather.main?.pressure ?? "N/A"} hPa
                  </p>
                  <p className="text-lg text-gray-700">
                    Visibility: {(weather.visibility ?? 0) / 1000} km
                  </p>
                  <p className="text-lg text-gray-700">
                    Wind: {weather.wind?.speed ?? "N/A"} m/s{" "}
                    {weather.wind?.deg ? `(${weather.wind.deg}°)` : ""}
                  </p>
                  <p className="text-lg text-gray-700">
                    Sunrise:{" "}
                    {weather.sys?.sunrise
                      ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "N/A"}
                  </p>
                  <p className="text-lg text-gray-700">
                    Sunset:{" "}
                    {weather.sys?.sunset
                      ? new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="border p-4 rounded-lg bg-white">
                  <p className="text-lg text-gray-700">
                    Cloudiness: {weather.clouds?.all ?? "N/A"}%
                  </p>
                  {weather.rain && (
                    <p className="text-lg text-gray-700">
                      Rain in last 1h: {weather.rain["1h"] ?? "N/A"} mm
                    </p>
                  )}
                  {weather.snow && (
                    <p className="text-lg text-gray-700">
                      Snow in last 1h: {weather.snow["1h"] ?? "N/A"} mm
                    </p>
                  )}
                </div>
                <div className="border p-4 rounded-lg bg-white">
                  <p className="text-lg text-gray-700">
                    Timezone: {(weather.timezone ?? 0) / 3600} hours from UTC
                  </p>
                  <p className="text-lg text-gray-700">
                    Local Time:{" "}
                    {weather.dt
                      ? new Date(
                          weather.dt * 1000 + (weather.timezone ?? 0) * 1000
                        ).toLocaleTimeString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Weather;
