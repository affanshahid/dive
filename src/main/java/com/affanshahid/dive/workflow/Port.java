package com.affanshahid.dive.workflow;

import java.util.ArrayList;
import java.util.List;

public class Port {
    private String id;
    private String label;
    private List<Port> connections;

    private Node<?> node;

    public Port() {
        this.connections = new ArrayList<>();
    }

    public Port(String id, String label, Node<?> node) {
        this();
        this.id = id;
        this.label = label;
        this.node = node;
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

    public List<Port> getConnections() {
        return connections;
    }

    public void addConnection(Port conn) {
        this.connections.add(conn);
    }

    public Node<?> getNode() {
        return node;
    }

    public void setNode(Node<?> node) {
        this.node = node;
    }
}