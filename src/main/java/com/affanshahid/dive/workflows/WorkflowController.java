package com.affanshahid.dive.workflows;

import java.util.UUID;

import javax.validation.Valid;

import com.affanshahid.dive.workflows.dto.CreateWorkflowDTO;
import com.affanshahid.dive.workflows.dto.UpdateWorkflowDTO;
import com.affanshahid.dive.workflows.dto.WorkflowDTO;
import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(path = "/api/workflows")
public class WorkflowController {
    @Autowired
    private WorkflowService service;

    @GetMapping
    @JsonView(View.Summary.class)
    public Iterable<WorkflowDTO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    WorkflowDTO findById(@PathVariable UUID id) {
        return service.findDTOById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkflowDTO create(@Valid @RequestBody CreateWorkflowDTO dto) {
        return service.create(dto);
    }

    @PatchMapping("/{id}")
    public WorkflowDTO update(@PathVariable UUID id, @Valid @RequestBody UpdateWorkflowDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("{id}")
    WorkflowDTO delete(@PathVariable UUID id) {
        return service.delete(id);
    }
}