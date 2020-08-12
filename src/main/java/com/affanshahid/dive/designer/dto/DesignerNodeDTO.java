package com.affanshahid.dive.designer.dto;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.module.jsonSchema.JsonSchema;

public class DesignerNodeDTO {
    @NotBlank
    private String type;

    @NotBlank
    private String className;

    @NotNull
    private List<String> inputPorts;

    @NotNull
    private List<String> outputPorts;

    @NotBlank
    private String configClassName;

    @NotNull
    private JsonSchema configSchema;

    public String getType() {
        return type;
    }

    public JsonSchema getConfigSchema() {
        return configSchema;
    }

    public void setConfigSchema(JsonSchema configSchema) {
        this.configSchema = configSchema;
    }

    public String getConfigClassName() {
        return configClassName;
    }

    public void setConfigClassName(String configClassName) {
        this.configClassName = configClassName;
    }

    public List<String> getOutputPorts() {
        return outputPorts;
    }

    public void setOutputPorts(List<String> outputPorts) {
        this.outputPorts = outputPorts;
    }

    public List<String> getInputPorts() {
        return inputPorts;
    }

    public void setInputPorts(List<String> inputPorts) {
        this.inputPorts = inputPorts;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public void setType(String type) {
        this.type = type;
    }

}