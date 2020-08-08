package com.affanshahid.dive.workflows.dto;

import java.util.List;
import java.util.Objects;

public class PortDTO {
    private String id;
    private String label;
    private List<String> connections;
    private String node;

    public String getNode() {
        return node;
    }

    public void setNode(String node) {
        this.node = node;
    }

    public List<String> getConnections() {
        return connections;
    }

    public void setConnections(List<String> connections) {
        this.connections = connections;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getId() {
        return id;
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
        if (!(obj instanceof PortDTO)) {
            return false;
        }

        var port = (PortDTO) obj;
        return id.equals(port.getId());
    }
}