package com.affanshahid.dive.designer;

import static java.util.stream.Collectors.toList;

import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.List;

import com.affanshahid.dive.designer.dto.DesignerNodeDTO;
import com.affanshahid.dive.workflow.Node;
import com.affanshahid.dive.workflow.Port;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.module.jsonSchema.JsonSchemaGenerator;

import org.reflections.Reflections;
import org.springframework.stereotype.Service;

@Service
public class DesignerServiceImpl implements DesignerService {
    private String[] SCAN_PACKAGES = { "com.affanshahid.dive.workflow.readers",
            "com.affanshahid.dive.workflow.operators", "com.affanshahid.dive.workflow.outputs" };
    private List<DesignerNodeDTO> nodes;

    public DesignerServiceImpl() {
        nodes = new ArrayList<>();

        for (var pkg : SCAN_PACKAGES) {
            Reflections reflections = new Reflections(pkg);
            var subTypes = reflections.getSubTypesOf(Node.class);

            nodes.addAll(subTypes.stream().map(clazz -> {
                @SuppressWarnings("unchecked")
                var casted = (Class<? extends Node<?>>) clazz;
                return casted;
            }).map(this::classToDTO).collect(toList()));
        }
    }

    @Override
    public List<DesignerNodeDTO> getNodes() {
        return nodes;
    }

    private DesignerNodeDTO classToDTO(Class<? extends Node<?>> clazz) {
        try {
            var pkgSegments = clazz.getCanonicalName().split("\\.");
            var type = pkgSegments[pkgSegments.length - 2];
            ParameterizedType superClass = (ParameterizedType) clazz.getGenericSuperclass();
            var cfgClazz = (Class<?>) superClass.getActualTypeArguments()[0];
            JsonSchemaGenerator jg = new JsonSchemaGenerator(new ObjectMapper());
            Node<?> node = clazz.getConstructor(String.class, String.class).newInstance("N/A", "N/A");

            var dto = new DesignerNodeDTO();

            dto.setClassName(clazz.getCanonicalName());
            dto.setConfigClassName(cfgClazz.getCanonicalName());
            dto.setConfigSchema(jg.generateSchema(cfgClazz));
            dto.setInputPorts(node.getInputPorts().stream().map(Port::getLabel).collect(toList()));
            dto.setOutputPorts(node.getOutputPorts().stream().map(Port::getLabel).collect(toList()));
            dto.setType(type);

            return dto;
        } catch (ReflectiveOperationException | JsonProcessingException ex) {
            throw new ConversionException(ex);
        }
    }
}