package com.affanshahid.dive.workflow;

public class Workflow {
    private Node<?> root;

    public Workflow() {
    }

    public Workflow(Node<?> root) {
        this.root = root;
    }

    public Node<?> getRoot() {
        return root;
    }

    public void setRoot(Node<?> root) {
        this.root = root;
    }
}