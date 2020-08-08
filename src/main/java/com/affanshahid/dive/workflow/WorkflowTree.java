package com.affanshahid.dive.workflow;

public class WorkflowTree {
    private Node<?> root;

    public WorkflowTree() {
    }

    public WorkflowTree(Node<?> root) {
        this.root = root;
    }

    public Node<?> getRoot() {
        return root;
    }

    public void setRoot(Node<?> root) {
        this.root = root;
    }
}