package com.affanshahid.dive.workflows;

import static java.util.stream.Collectors.toList;

import java.util.UUID;
import java.util.stream.StreamSupport;

import com.affanshahid.dive.commons.ResourceNotFoundException;
import com.affanshahid.dive.workflows.dto.CreateWorkflowDTO;
import com.affanshahid.dive.workflows.dto.UpdateWorkflowDTO;
import com.affanshahid.dive.workflows.dto.WorkflowDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkflowServiceImpl implements WorkflowService {
    @Autowired
    private WorkflowRepository repository;

    @Autowired
    private WorkflowTreeConverter converter;

    @Override
    public Iterable<WorkflowDTO> findAll() {
        return StreamSupport.stream(repository.findAll().spliterator(), false).map(this::workflowToDTO)
                .collect(toList());
    }

    @Override
    public WorkflowDTO findDTOById(UUID id) {
        return workflowToDTO(findById(id));
    }

    @Override
    public Workflow findById(UUID id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException(id.toString()));
    }

    @Override
    public WorkflowDTO create(CreateWorkflowDTO dto) {
        var workflow = new Workflow();
        workflow.setName(dto.getName());
        workflow.setTree(converter.fromDTO(dto.getTree()));

        return workflowToDTO(repository.save(workflow));
    }

    @Override
    public WorkflowDTO update(UUID id, UpdateWorkflowDTO dto) {
        var workflow = findById(id);

        dto.getName().ifPresent(name -> workflow.setName(name));
        dto.getTree().map(converter::fromDTO).ifPresent(tree -> workflow.setTree(tree));

        return workflowToDTO(repository.save(workflow));
    }

    @Override
    public WorkflowDTO delete(UUID id) {
        var dto = findDTOById(id);
        repository.deleteById(id);
        return dto;
    }

    private WorkflowDTO workflowToDTO(Workflow workflow) {
        var dto = new WorkflowDTO();
        dto.setId(workflow.getId());
        dto.setName(workflow.getName());
        dto.setTree(converter.toDTO(workflow.getTree()));
        return dto;
    }
}