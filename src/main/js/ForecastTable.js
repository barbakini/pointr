'use strict';

import React, {useEffect, useState, useCallback} from 'react';
import moment from 'moment';
import stompClient from "./SocketUtil";

export default ({cities}) => {
    const [sortedForecasts, setSortedForecasts] = useState([]);
    const [forecasts, setForecasts] = useState([]);
    const [sortField, setSortField] = useState("cityName");
    const [sortDirectionAsc, setSortDirectionAsc] = useState(true);

    useEffect(() => {
        cities.forEach(city => {
            stompClient.subscribe('/topic/city-' + city.id, handleSocketData);
        });

        return () => cities.forEach(city => stompClient.unsubscribe('/topic/city-' + city.id));
    }, []);

    const handleSocketData = useCallback((data) => {
        const forecast = JSON.parse(data.body);
        setForecasts(prevState => {
            const newForecasts = prevState.filter(f => f.id !== forecast.id);
            newForecasts.push(forecast);
            return newForecasts;
        });
    }, []);

    const handleSort = useCallback((fieldName) => {
        if (fieldName === sortField) {
            setSortDirectionAsc(prevState => !prevState);
        } else {
            setSortField(fieldName);
        }
    }, [sortField]);

    useEffect(() => {
        const sortedForecasts = [...forecasts].sort((a, b) => a[sortField] > b[sortField] ? sortDirectionAsc ? 1 : -1 : sortDirectionAsc ? -1 : 1);
        setSortedForecasts(sortedForecasts);
    }, [forecasts, sortField, sortDirectionAsc]);

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <td><a href={"#"} onClick={() => handleSort("cityName")}>City</a></td>
                    <td><a href={"#"} onClick={() => handleSort("temperature")}>Temperature</a></td>
                    <td><a href={"#"} onClick={() => handleSort("wind")}>Wind</a></td>
                    <td><a href={"#"} onClick={() => handleSort("humidity")}>Humidity</a></td>
                    <td><a href={"#"} onClick={() => handleSort("precipitation")}>Precipitation</a></td>
                    <td><a href={"#"} onClick={() => handleSort("forecastTime")}>Forecast Time</a></td>
                </tr>
                </thead>
                <tbody>
                {sortedForecasts.map(forecast => (
                    <tr>
                        <td>{forecast.cityName}</td>
                        <td style={{backgroundColor: forecast.temperature < 18 ? "aqua" : forecast.temperature > 30 ? "crimson" : "springgreen"}}>{forecast.temperature}</td>
                        <td>{forecast.wind}</td>
                        <td>{forecast.humidity}</td>
                        <td>{forecast.precipitation}</td>
                        <td>{moment(forecast.forecastTime).format("DD/MM/YYYY HH:mm:ss")}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}


