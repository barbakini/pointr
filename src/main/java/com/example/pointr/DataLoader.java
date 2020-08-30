package com.example.pointr;

import com.example.pointr.domain.City;
import com.example.pointr.domain.WeatherForecast;
import com.example.pointr.repository.CityRepository;
import com.example.pointr.repository.WeatherForecastRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.stream.Stream;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private WeatherForecastRepository weatherForecastRepository;

    @Override
    public void run(String... strings) throws Exception {
        final Double[] values = {17.2, 20.4, 24.6, 6d};

        Stream.of("Istanbul", "London", "Berlin", "Paris").forEach(cityName -> {
            City city = City.builder().name(cityName).build();
            city = cityRepository.save(city);
            WeatherForecast weatherForecast = WeatherForecast.builder()
                    .cityId(city.getId())
                    .temperature(values[0])
                    .humidity(values[1])
                    .wind(values[2])
                    .precipitation(values[3])
                    .forecastTime(LocalDateTime.now())
                    .build();
            weatherForecastRepository.save(weatherForecast);
            values[0] = values[0] + 2;
            values[1] = values[1] + 4;
            values[2] = values[2] + 3;
            values[3] = values[3] + 5;
        });
    }
}
