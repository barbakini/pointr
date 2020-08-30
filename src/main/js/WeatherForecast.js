'use strict';

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';

export default ({selectedCity}) => {
    const [weatherForecast, setWeatherForecast] = useState(null);

    useEffect(() => {
        if (selectedCity) {
            (async function fetchCities() {
                const resp = await axios.get("api/weatherForecasts/search/getByCityId", {params: {cityId: selectedCity.id}});
                setWeatherForecast(resp.data);
            })();
        }
    }, [selectedCity]);

    return (
        (!selectedCity) ?
            <div><h2>Choose a city to see its weather forecast</h2></div>
            :
            (!weatherForecast) ?
                <div>
                    Loading...
                </div>
                :
                <div>
                    <table>
                        <tbody>
                        <tr>
                            <td>CityName:</td>
                            <td>{selectedCity.name}</td>
                        </tr>
                        <tr>
                            <td>Temperature:</td>
                            <td>{weatherForecast.temperature}°C</td>
                        </tr>
                        <tr>
                            <td>Humidity:</td>
                            <td>{weatherForecast.humidity}%</td>
                        </tr>
                        <tr>
                            <td>Wind:</td>
                            <td>{weatherForecast.wind}km/h</td>
                        </tr>
                        <tr>
                            <td>Precipitation:</td>
                            <td>{weatherForecast.precipitation}%</td>
                        </tr>
                        <tr>
                            <td>Forecast Time:</td>
                            <td>{moment(weatherForecast.forecastTime).format("DD/MM/YYYY HH:mm")}</td>
                        </tr>
                        </tbody>

                    </table>
                </div>
    )
}


