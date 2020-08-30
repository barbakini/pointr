package com.example.pointr.repository;

import com.example.pointr.domain.WeatherForecast;
import org.springframework.data.repository.CrudRepository;

public interface WeatherForecastRepository extends CrudRepository<WeatherForecast, Integer> {

    WeatherForecast getByCityId(Integer cityId);
}
