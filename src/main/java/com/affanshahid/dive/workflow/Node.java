package com.affanshahid.dive.workflow;

import java.util.Collections;
import java.util.List;

public abstract class Node<T> {
    private String id;
    private String label;

    private List<Port> inputPorts;
    private List<Port> outputPorts;

    private T config;

    public Node() {
        this.inputPorts = createInputPorts();
        this.outputPorts = createOutputPorts();
    }

    public Node(String id, String label, T config) {
        this();
        this.id = id;
        this.label = label;
        this.config = config;
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

    public boolean isRoot() {
        for (var port : inputPorts) {
            if (port.getConnections().size() > 0)
                return false;
        }

        return true;
    }

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