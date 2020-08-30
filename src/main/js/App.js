'use strict';

import 'regenerator-runtime/runtime'
import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import WeatherForecast from "./WeatherForecast";

const App = () => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect( () => {
        (async function fetchCities() {
            const resp = await axios.get("api/cities");
            setCities(resp.data._embedded.cities);
        })();
    }, []);

    const handleCityChange = useCallback((event) => {
        const city = cities.find(city => city.id.toString() === event.target.value.toString());
        setSelectedCity(city);
    });

    return (
        <div>
            <div><h1>Select a City to Get Weather Forecast</h1>
                <select value={selectedCity ? selectedCity.id : -1}
                        onChange={handleCityChange}>
                    <option key="-1" value={-1}>Select a city</option>
                    {cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
                </select>
            </div>
            <WeatherForecast selectedCity={selectedCity} />
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
