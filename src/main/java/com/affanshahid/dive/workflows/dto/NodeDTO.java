package com.affanshahid.dive.workflows.dto;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

public class NodeDTO<T> {
    @JsonProperty("@class")
    private String className;
    private String id;
    private String label;
    private List<String> inputPorts;
    private List<String> outputPorts;
    @JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "@class")
    private T config;

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getId() {
        return id;
    }

    public T getConfig() {
        return config;
    }

    public void setConfig(T config) {
        this.config = config;
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

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof NodeDTO)) {
            return false;
        }

        var node = (NodeDTO<?>) obj;
        return id.equals(node.getId());
    }
}