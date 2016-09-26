package com.ecomindo;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

//public class MyCorsFilter extends CorsFilter {
//
//	public MyCorsFilter() {
//		super(configurationSource());
//	}
//
//	private static UrlBasedCorsConfigurationSource configurationSource() {
//		CorsConfiguration config = new CorsConfiguration();
//		config.setAllowCredentials(true);
//		config.addAllowedOrigin("http://localhost:8080");
//		config.addAllowedHeader("*");
//		config.addAllowedMethod("*");
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", config);
//		return source;
//	}
//}