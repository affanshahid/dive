package com.affanshahid.dive.workflow;

import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "@class")
public abstract class Node<T> {
    private String id;
    private String label;

    private List<Port> inputPorts;
    private List<Port> outputPorts;

    @JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "@class")
    private T config;

    public Node() {
    }

    public Node(String id, String label, T config) {
        this.id = id;
        this.label = label;
        this.config = config;
        this.inputPorts = createInputPorts();
        this.outputPorts = createOutputPorts();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Port getInputPort(int portIndex) {
        return inputPorts.get(portIndex);
    }

    public Port getOutputPort(int portIndex) {
        return outputPorts.get(portIndex);
    }

    public List<Port> getInputPorts() {
        return Collections.unmodifiableList(inputPorts);
    }

    public List<Port> getOutputPorts() {
        return Collections.unmodifiableList(outputPorts);
    }

    public void setInputPorts(List<Port> ports) {
        this.inputPorts = ports;
    }

    public void setOutputPorts(List<Port> ports) {
        this.outputPorts = ports;
    }

    @JsonIgnore
    public boolean isRoot() {
        for (var port : inputPorts) {
            if (port.getConnections().size() > 0)
                return false;
        }

        return true;
    }

    @JsonIgnore
    public boolean isLeaf() {
        for (var port : outputPorts) {
            if (port.getConnections().size() > 0)
                return false;
        }

        return true;
    }

    public T getConfig() {
        return config;
    }

    public void setConfig(T config) {
        this.config = config;
    }

    protected String createPortId(String localPortId) {
        return id + "-" + localPortId;
    }

    protected abstract List<Port> createInputPorts();

    protected abstract List<Port> createOutputPorts();
}