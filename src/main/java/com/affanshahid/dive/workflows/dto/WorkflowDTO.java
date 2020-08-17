package com.affanshahid.dive.workflows.dto;

import java.util.UUID;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.affanshahid.dive.workflows.View;
import com.fasterxml.jackson.annotation.JsonView;

public class WorkflowDTO {
    @NotNull
    @JsonView(View.Summary.class)
    private UUID id;

    @NotBlank
    @JsonView(View.Summary.class)
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