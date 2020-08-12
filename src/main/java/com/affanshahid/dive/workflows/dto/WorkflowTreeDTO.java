package com.affanshahid.dive.workflows.dto;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class WorkflowTreeDTO {
    @NotEmpty
    @NotNull
    private List<NodeDTO<?>> nodes;

    @NotNull
    private List<PortDTO> ports;

    @NotBlank
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