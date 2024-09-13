import React, { useState } from "react";
import "./Weather.css";

const api = {
  key: "13a93a4677c8cff0daa8465346d883db",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          setQuery("");
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };
  console.log("weather", weather);

  return (
    <div
      className={
        typeof weather?.main != undefined
          ? weather?.main?.temp > 16
            ? "app-warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="searchbox">
          <input
            type="text"
            className="searchbar"
            placeholder="Search..."
            value={query}
            onKeyPress={search}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {typeof weather.main != undefined ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather?.name},{weather?.sys?.country}
              </div>
              <div className="date">{new Date().toDateString()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {weather?.main?.temp ? Math.round(weather?.main?.temp) : ""}
                °C
              </div>
              <div className="weather">{weather?.weather?.[0]?.main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default Weather;
