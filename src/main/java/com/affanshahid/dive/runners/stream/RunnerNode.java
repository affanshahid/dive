package com.affanshahid.dive.runners.stream;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.affanshahid.dive.workflow.Node;

public abstract class RunnerNode<T extends Node<?>> {
    private T node;
    private List<RunnerPort> outputPorts;
    private List<RunnerPort> inputPorts;

    public RunnerNode(T node) {
        this.node = node;
        inputPorts = node.getInputPorts().stream().map(p -> new RunnerPort(this)).collect(Collectors.toList());
        outputPorts = node.getOutputPorts().stream().map(p -> new RunnerPort(this)).collect(Collectors.toList());
    }

    public List<RunnerPort> getInputPorts() {
        return inputPorts;
    }

    public List<RunnerPort> getOutputPorts() {
        return outputPorts;
    }

    public RunnerPort getInputPort(int index) {
        return inputPorts.get(index);
    }

    public RunnerPort getOutputPort(int index) {
        return outputPorts.get(index);
    }

    public T getNode() {
        return node;
    }

    public Stream<DataRow> getOutputStream(int portIndex) throws Exception {
        if (portIndex < 0 || portIndex >= node.getOutputPorts().size()) {
            throw new IllegalArgumentException("no such port: " + portIndex);
        }

        List<Stream<DataRow>> inputStreams = new ArrayList<>(inputPorts.size());

        for (var port : inputPorts) {
            for (var conn : port.getConnections()) {
                inputStreams.add(conn.getNode().getOutputStream(conn.getNode().getOutputPorts().indexOf(conn)));
            }
        }

        return createOutputStream(portIndex, inputStreams);
    }

    protected abstract Stream<DataRow> createOutputStream(int portIndex, List<Stream<DataRow>> inputs) throws Exception;
}