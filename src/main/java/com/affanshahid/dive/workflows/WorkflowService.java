package com.affanshahid.dive.workflows;

import java.util.UUID;

import com.affanshahid.dive.workflows.dto.CreateWorkflowDTO;
import com.affanshahid.dive.workflows.dto.UpdateWorkflowDTO;
import com.affanshahid.dive.workflows.dto.WorkflowDTO;

public interface WorkflowService {
    Iterable<WorkflowDTO> findAll();

    Workflow findById(UUID id);

    WorkflowDTO findDTOById(UUID id);

    WorkflowDTO create(CreateWorkflowDTO dto);

    WorkflowDTO update(UUID id, UpdateWorkflowDTO dto);

    WorkflowDTO delete(UUID id);
}