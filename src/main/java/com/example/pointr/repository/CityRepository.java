package com.example.pointr.repository;

import com.example.pointr.domain.City;
import org.springframework.data.repository.CrudRepository;

public interface CityRepository extends CrudRepository<City, Integer> {

    City getByName(String name);
}
