package com.pointr.repository;

import com.pointr.domain.City;
import org.springframework.data.repository.CrudRepository;

public interface CityRepository extends CrudRepository<City, Integer> {

    City getByName(String name);
}
