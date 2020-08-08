package com.affanshahid.dive.workflows;

import com.affanshahid.dive.workflows.dto.CreateWorkflowDTO;
import com.affanshahid.dive.workflows.dto.WorkflowDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping(path = "/api/workflows")
public class WorkflowController {
    @Autowired
    private WorkflowService service;

    @GetMapping
    public Iterable<WorkflowDTO> findAll() {
        return service.findAll();
    }

    @PostMapping
    public WorkflowDTO create(@RequestBody CreateWorkflowDTO dto) throws ConversionException {
        return service.create(dto);
    }
}