package com.affanshahid.dive.config;

import static springfox.documentation.schema.AlternateTypeRules.newRule;

import java.util.List;

import com.fasterxml.classmate.TypeResolver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.WildcardType;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Autowired
    private TypeResolver resolver;

    @Bean
    public Docket petApi() {
        return new Docket(DocumentationType.SWAGGER_2).select()
                .apis(RequestHandlerSelectors.basePackage("com.affanshahid.dive")).paths(PathSelectors.any()).build()
                .alternateTypeRules(newRule(resolver.resolve(Iterable.class, WildcardType.class),
                        resolver.resolve(List.class, WildcardType.class)));
    }
}