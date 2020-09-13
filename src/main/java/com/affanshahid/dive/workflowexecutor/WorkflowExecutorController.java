package com.affanshahid.dive.workflowexecutor;

import java.util.List;
import java.util.UUID;

import com.affanshahid.dive.runners.ViewData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/workflow-executor")
public class WorkflowExecutorController {
    @Autowired
    private WorkflowExecutorService service;

    @GetMapping("/run/{workflowId}")
    public List<ViewData<?>> run(@PathVariable UUID workflowId) throws Exception {
        return service.runWorkflow(workflowId);
    }
}