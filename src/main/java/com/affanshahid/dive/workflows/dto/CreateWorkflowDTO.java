package com.affanshahid.dive.workflows.dto;

public class CreateWorkflowDTO {
    private String name;
    private WorkflowTreeDTO tree;

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
}