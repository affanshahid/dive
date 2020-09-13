package com.affanshahid.dive.workflowexecutor;

import java.util.List;
import java.util.UUID;

import com.affanshahid.dive.runners.ViewData;

public interface WorkflowExecutorService {
    List<ViewData<?>> runWorkflow(UUID workflowId) throws Exception;
}