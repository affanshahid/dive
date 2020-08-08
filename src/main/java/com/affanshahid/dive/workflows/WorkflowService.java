package com.affanshahid.dive.workflows;

import static java.util.stream.Collectors.toList;

import java.util.stream.StreamSupport;

import com.affanshahid.dive.workflows.dto.CreateWorkflowDTO;
import com.affanshahid.dive.workflows.dto.WorkflowDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkflowService {
    @Autowired
    private WorkflowRepository repository;

    @Autowired
    private WorkflowTreeConverter converter;

    public Iterable<WorkflowDTO> findAll() {
        return StreamSupport.stream(repository.findAll().spliterator(), false).map(this::workflowToDTO)
                .collect(toList());
    }

    public WorkflowDTO create(CreateWorkflowDTO dto) throws ConversionException {
        var workflow = new Workflow();
        workflow.setName(dto.getName());
        workflow.setTree(converter.fromDTO(dto.getTree()));

        return workflowToDTO(repository.save(workflow));
    }

    private WorkflowDTO workflowToDTO(Workflow workflow) {
        var dto = new WorkflowDTO();
        dto.setId(workflow.getId());
        dto.setName(workflow.getName());
        dto.setTree(converter.toDTO(workflow.getTree()));
        return dto;
    }
}