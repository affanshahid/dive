package com.affanshahid.dive.runners;

import com.affanshahid.dive.workflow.Workflow;

public interface Runner {
    void setWorkflow(Workflow workflow);

    void run() throws Exception;
}