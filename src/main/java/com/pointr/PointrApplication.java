package com.pointr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PointrApplication {

	public static void main(String[] args) {
		SpringApplication.run(PointrApplication.class, args);
	}

}
