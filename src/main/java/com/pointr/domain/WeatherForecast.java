package com.pointr.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Entity
public class WeatherForecast {

    @Id
    @GeneratedValue
    private Integer id;

    private Integer cityId;

    private String cityName;

    private LocalDateTime forecastTime;

    private Double temperature;

    private Double humidity;

    private Double wind;

    private Double precipitation;

}
