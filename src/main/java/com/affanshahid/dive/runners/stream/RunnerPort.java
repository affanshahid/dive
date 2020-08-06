package com.affanshahid.dive.runners.stream;

import java.util.ArrayList;
import java.util.List;

public class RunnerPort {
    private RunnerNode<?> node;
    private List<RunnerPort> connections;

    public RunnerPort(RunnerNode<?> node) {
        this.node = node;
        connections = new ArrayList<>();
    }

    public RunnerNode<?> getNode() {
        return node;
    }

    public List<RunnerPort> getConnections() {
        return connections;
    }

    public void addConnection(RunnerPort conn) {
        connections.add(conn);
    }
}