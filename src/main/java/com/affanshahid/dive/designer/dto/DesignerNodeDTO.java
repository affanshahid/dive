package com.affanshahid.dive.designer.dto;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.JsonNode;

public class DesignerNodeDTO {
    @NotBlank
    private String type;

    @NotBlank
    private String className;

    @NotNull
    private List<String> inputPorts;

    @NotNull
    private List<String> outputPorts;

    @NotNull
    private List<String> views;

    @NotBlank
    private String configClassName;

    @NotNull
    private JsonNode configSchema;

    public String getType() {
        return type;
    }

    public JsonNode getConfigSchema() {
        return configSchema;
    }

    public void setConfigSchema(JsonNode configSchema) {
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

    public List<String> getViews() {
        return views;
    }

    public void setViews(List<String> views) {
        this.views = views;
    }
}