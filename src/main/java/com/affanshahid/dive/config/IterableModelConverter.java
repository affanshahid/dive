package com.affanshahid.dive.config;

import java.util.Iterator;
import java.util.List;

import com.fasterxml.jackson.databind.JavaType;

import org.springframework.stereotype.Component;

import io.swagger.v3.core.converter.AnnotatedType;
import io.swagger.v3.core.converter.ModelConverter;
import io.swagger.v3.core.converter.ModelConverterContext;
import io.swagger.v3.core.util.Json;
import io.swagger.v3.oas.models.media.Schema;

@Component
public class IterableModelConverter implements ModelConverter {

    @Override
    public Schema<?> resolve(AnnotatedType annotatedType, ModelConverterContext context,
            Iterator<ModelConverter> chain) {
        JavaType javaType = Json.mapper().constructType(annotatedType.getType());
        if (javaType != null) {
            Class<?> cls = javaType.getRawClass();

            if (Iterable.class.equals(cls)) {
                JavaType replacement = Json.mapper().getTypeFactory().constructCollectionType(List.class,
                        javaType.containedType(0).getRawClass());

                annotatedType.setType(replacement);
            }
        }
        return (chain.hasNext()) ? chain.next().resolve(annotatedType, context, chain) : null;
    }
}