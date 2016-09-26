package com.ecomindo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class AngularWebApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(AngularWebApplication.class, args);
	}
}
