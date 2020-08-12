package com.affanshahid.dive.workflows.dto;

import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.Size;

public class UpdateWorkflowDTO {
    private Optional<@Size(min = 1) String> name = Optional.empty();

    private Optional<@Valid WorkflowTreeDTO> tree = Optional.empty();

    public Optional<String> getName() {
        return name;
    }

    public Optional<WorkflowTreeDTO> getTree() {
        return tree;
    }

    public void setTree(Optional<WorkflowTreeDTO> tree) {
        this.tree = tree;
    }

    public void setName(Optional<String> name) {
        this.name = name;
    }

}