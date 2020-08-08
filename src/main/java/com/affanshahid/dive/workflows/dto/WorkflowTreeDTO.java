package com.affanshahid.dive.workflows.dto;

import java.util.List;

public class WorkflowTreeDTO {
    private List<NodeDTO<?>> nodes;
    private List<PortDTO> ports;
    private String root;

    public String getRoot() {
        return root;
    }

    public void setRoot(String root) {
        this.root = root;
    }

    public List<NodeDTO<?>> getNodes() {
        return nodes;
    }

    public List<PortDTO> getPorts() {
        return ports;
    }

    public void setPorts(List<PortDTO> ports) {
        this.ports = ports;
    }

    public void setNodes(List<NodeDTO<?>> nodes) {
        this.nodes = nodes;
    }
}