package com.affanshahid.dive.workflows.dto;

import java.util.UUID;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class WorkflowDTO {
    @NotNull
    private UUID id;

    @NotBlank
    private String name;

    @Valid
    @NotNull
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