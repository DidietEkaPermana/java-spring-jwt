package com.ecomindo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

/*
 * from spring boot to tomcat:
 * extends main class to 'SpringBootServletInitializer'
 * 
 * change pom.xml 
 * 
 * <packaging>jar</packaging> -> <packaging>war</packaging>
 * 
 * add in pom.xml
 * 
 * <dependency>
	        <groupId>org.springframework.boot</groupId>
	        <artifactId>spring-boot-starter-tomcat</artifactId>
	        <scope>provided</scope>
	    </dependency>
 */
@SpringBootApplication
public class ResourceCustomerApplication extends SpringBootServletInitializer {
	public static void main(String[] args) {
		SpringApplication.run(ResourceCustomerApplication.class, args);
	}
}
