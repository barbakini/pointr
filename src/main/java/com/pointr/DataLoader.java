package com.pointr;

import com.pointr.domain.City;
import com.pointr.domain.WeatherForecast;
import com.pointr.repository.CityRepository;
import com.pointr.repository.WeatherForecastRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private WeatherForecastRepository weatherForecastRepository;

    @Autowired
    private SimpMessagingTemplate template;

    @Override
    public void run(String... strings) throws Exception {
        final Double[] values = {17.2, 20.4, 24.6, 6d};

        Stream.of("İstanbul", "London", "Berlin", "Paris", "Ankara", "Malatya", "Antalya", "İzmir", "Mersin", "Bursa").forEach(cityName -> {
            City city = City.builder().name(cityName).build();
            city = cityRepository.save(city);
            WeatherForecast weatherForecast = WeatherForecast.builder()
                    .cityId(city.getId())
                    .cityName(city.getName())
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

    @Scheduled(fixedRate = 5000)
    public void updateData() {
        List<WeatherForecast> forecastList = StreamSupport.stream(weatherForecastRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        for (WeatherForecast weatherForecast : forecastList) {
            double random = ((int)(ThreadLocalRandom.current().nextDouble(10, 41) * 100)) / 100.0;
            weatherForecast.setTemperature(random);
            random = ((int)(ThreadLocalRandom.current().nextDouble(10, 101) * 10)) / 10.0;
            weatherForecast.setWind(random);
            weatherForecast.setForecastTime(LocalDateTime.now());
            weatherForecastRepository.save(weatherForecast);
            template.convertAndSend("/topic/city-" + weatherForecast.getCityId(), weatherForecast);
        }
        WeatherForecast hottestCity = forecastList.stream().max(Comparator.comparing(WeatherForecast::getTemperature)).orElse(forecastList.get(0));
        WeatherForecast coldestCity = forecastList.stream().min(Comparator.comparing(WeatherForecast::getTemperature)).orElse(forecastList.get(0));
        WeatherForecast windiestCity = forecastList.stream().max(Comparator.comparing(WeatherForecast::getWind)).orElse(forecastList.get(0));

        template.convertAndSend("/topic/hottest-city", hottestCity);
        template.convertAndSend("/topic/coldest-city", coldestCity);
        template.convertAndSend("/topic/windiest-city", windiestCity);
    }
}
