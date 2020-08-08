package com.affanshahid.dive.workflows;

import com.affanshahid.dive.workflows.dto.CreateWorkflowDTO;
import com.affanshahid.dive.workflows.dto.WorkflowDTO;

public interface WorkflowService {
    Iterable<WorkflowDTO> findAll();

    WorkflowDTO create(CreateWorkflowDTO dto) throws ConversionException;
}