'use strict';

import React from 'react';
import moment from 'moment';

export default ({title, weatherForecast, backgroundColor}) => {
    return (
        <div><h2 style={{backgroundColor: backgroundColor}}>{title}</h2>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>CityName:</td>
                        <td>{weatherForecast.cityName}</td>
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
                        <td>{moment(weatherForecast.forecastTime).format("DD/MM/YYYY HH:mm:ss")}</td>
                    </tr>
                    </tbody>

                </table>
            </div>
        </div>
    )
}


