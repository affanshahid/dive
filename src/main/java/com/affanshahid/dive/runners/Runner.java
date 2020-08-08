package com.affanshahid.dive.runners;

import com.affanshahid.dive.workflow.WorkflowTree;

public interface Runner {
    void setWorkflow(WorkflowTree workflow);

    void run() throws Exception;
}