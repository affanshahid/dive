package com.affanshahid.dive.workflows.dto;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class CreateWorkflowDTO {
    @NotBlank
    private String name;

    @Valid
    @NotNull
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