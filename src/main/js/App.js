'use strict';

import 'regenerator-runtime/runtime'
import React, {useState, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import WeatherForecast from "./WeatherForecast";
import stompClient from "./SocketUtil";
import ForecastTable from "./ForecastTable";


const App = () => {
    const [cities, setCities] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    const [hottestForecast, setHottestForecast] = useState(null);
    const [coldestForecast, setColdestForecast] = useState(null);
    const [windiestForecast, setWindiestForecast] = useState(null);

    useEffect(() => {
        axios.get("api/cities").then((resp) => {
            setCities(resp.data._embedded.cities);
        });
        stompClient.connect({}, () => {
            setSocketConnected(true);
            stompClient.subscribe('/topic/hottest-city', (data) => {
                const forecast = JSON.parse(data.body);
                handleHottestForecast(forecast);
            });
            stompClient.subscribe('/topic/coldest-city', (data) => {
                const forecast = JSON.parse(data.body);
                handleColdestForecast(forecast);
            });
            stompClient.subscribe('/topic/windiest-city', (data) => {
                const forecast = JSON.parse(data.body);
                handleWindiestForecast(forecast);
            });
        });
    }, []);

    const handleHottestForecast = useCallback((hottestForecast) => {
        setHottestForecast(hottestForecast);
    });
    const handleColdestForecast = useCallback((coldestForecast) => {
        setColdestForecast(coldestForecast);
    });
    const handleWindiestForecast = useCallback((windiestForecast) => {
        setWindiestForecast(windiestForecast);
    });

    return socketConnected ? (
        <div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                {hottestForecast ? <WeatherForecast backgroundColor={"crimson"} title={"Hottest City"} weatherForecast={hottestForecast}/> : <h3>Loading...</h3>}
                {coldestForecast ? <WeatherForecast backgroundColor={"aqua"} title={"Coldest City"} weatherForecast={coldestForecast}/> : <h3>Loading...</h3>}
                {windiestForecast ? <WeatherForecast backgroundColor={"sienna"} title={"Windiest City"} weatherForecast={windiestForecast}/> : <h3>Loading...</h3>}
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
                {cities && <ForecastTable cities={cities}></ForecastTable>}
            </div>
        </div>
    ) : (<div><h2>Web Socket is connecting, please wait..</h2></div>)
};

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);
