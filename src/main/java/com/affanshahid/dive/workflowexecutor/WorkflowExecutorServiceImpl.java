package com.affanshahid.dive.workflowexecutor;

import java.util.List;
import java.util.UUID;

import com.affanshahid.dive.runners.Runner;
import com.affanshahid.dive.runners.ViewData;
import com.affanshahid.dive.runners.stream.StreamRunner;
import com.affanshahid.dive.workflows.WorkflowService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkflowExecutorServiceImpl implements WorkflowExecutorService {
    @Autowired
    private WorkflowService workflowService;

    @Override
    public List<ViewData<?>> runWorkflow(UUID workflowId) throws Exception {
        var workflow = workflowService.findById(workflowId);

        Runner runner = new StreamRunner();
        runner.setWorkflow(workflow.getTree());
        runner.run();
        return runner.getViewData();
    }

}