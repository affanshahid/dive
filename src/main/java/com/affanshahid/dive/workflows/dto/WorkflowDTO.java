package com.affanshahid.dive.workflows.dto;

import java.util.UUID;

public class WorkflowDTO {
    private UUID id;
    private String name;
    private WorkflowTreeDTO tree;

    public UUID getId() {
        return id;
    }

    public WorkflowTreeDTO getTree() {
        return tree;
    }

    public void setTree(WorkflowTreeDTO tree) {
        this.tree = tree;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}