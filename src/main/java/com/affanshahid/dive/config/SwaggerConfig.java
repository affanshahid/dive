package com.affanshahid.dive.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI petApi() {
		return new OpenAPI().info(new Info().title("Dive API").description("DIVE api documentation").version("1.0.0")
				.license(new License().name("MIT").url("https://opensource.org/licenses/MIT")));
	}

}