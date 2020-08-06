package com.affanshahid.dive.workflow.outputs;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.affanshahid.dive.workflow.Node;
import com.affanshahid.dive.workflow.Port;

public class Logger extends Node<Logger.Config> {
    public static final int PORT_IN_DATA = 0;

    public static final int PORT_OUT_LOGS = 0;

    public Logger(String id, String label) {
        super(id, label, new Logger.Config());
    }

    @Override
    protected List<Port> createInputPorts() {
        List<Port> ports = new ArrayList<>(Collections.nCopies(1, null));
        ports.set(PORT_IN_DATA, new Port(createPortId("data"), "Data", this));
        return ports;
    }

    @Override
    protected List<Port> createOutputPorts() {
        List<Port> ports = new ArrayList<>(Collections.nCopies(1, null));
        ports.set(PORT_OUT_LOGS, new Port(createPortId("logs"), "Logs", this));
        return ports;
    }

    public static class Config {
    }
}