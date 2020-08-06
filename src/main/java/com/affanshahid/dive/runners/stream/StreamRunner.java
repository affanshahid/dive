package com.affanshahid.dive.runners.stream;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.affanshahid.dive.runners.Runner;
import com.affanshahid.dive.runners.stream.operators.FilterRunner;
import com.affanshahid.dive.runners.stream.outputs.LoggerRunner;
import com.affanshahid.dive.runners.stream.readers.JSONReaderRunner;
import com.affanshahid.dive.workflow.Node;
import com.affanshahid.dive.workflow.Workflow;
import com.affanshahid.dive.workflow.operators.Filter;
import com.affanshahid.dive.workflow.outputs.Logger;
import com.affanshahid.dive.workflow.readers.JSONReader;

public class StreamRunner implements Runner {
    private static final Map<Class<?>, Class<?>> MAPPING = new HashMap<>();
    static {
        MAPPING.put(JSONReader.class, JSONReaderRunner.class);
        MAPPING.put(Filter.class, FilterRunner.class);
        MAPPING.put(Logger.class, LoggerRunner.class);
    }

    private static RunnerNode<?> instantiateRunnerNode(Node<?> node) throws Exception {
        Class<?> runnerClass = MAPPING.get(node.getClass());
        if (runnerClass == null) {
            throw new RuntimeException("unsupported node: " + node.getClass().getCanonicalName());
        }

        RunnerNode<?> runnerNode = (RunnerNode<?>) runnerClass.getDeclaredConstructor(node.getClass())
                .newInstance(node);
        return runnerNode;
    }

    private RunnerNode<?> root;
    private List<RunnerNode<?>> outputs;

    @Override
    public void run() throws Exception {
        if (root == null || outputs == null) {
            throw new RuntimeException("workflow not set");
        }

        for (var output : outputs) {
            for (int i = 0; i < output.getOutputPorts().size(); i++) {
                output.getOutputStream(i).map(row -> (String) row.get("OUT")).forEach(System.out::println);
                System.out.println("---");
            }
        }
    }

    @Override
    public void setWorkflow(Workflow workflow) {
        try {
            outputs = new ArrayList<>();
            root = buildRunnerNode(workflow.getRoot());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private RunnerNode<?> buildRunnerNode(Node<?> node) throws Exception {
        RunnerNode<?> runner = instantiateRunnerNode(node);

        for (int i = 0; i < node.getOutputPorts().size(); i++) {
            for (int j = 0; j < node.getOutputPort(i).getConnections().size(); j++) {
                var childPort = node.getOutputPort(i).getConnections().get(j);
                var child = childPort.getNode();
                var childPortIdx = child.getInputPorts().indexOf(childPort);
                var childRunner = buildRunnerNode(child);

                runner.getOutputPort(i).addConnection(childRunner.getInputPort(childPortIdx));
                childRunner.getInputPort(childPortIdx).addConnection(runner.getOutputPort(i));
            }
        }

        if (node.isLeaf()) {
            outputs.add(runner);
        }

        return runner;
    }
}