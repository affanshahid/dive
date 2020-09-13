package com.affanshahid.dive.workflow.outputs;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.affanshahid.dive.workflow.Node;
import com.affanshahid.dive.workflow.Port;
import com.affanshahid.dive.workflow.View;

public class Logger extends Node<Logger.Config> {
    public static final int PORT_IN_DATA = 0;

    public static final int OUTPUT_LOGS = 0;

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
        return new ArrayList<>();
    }

    @Override
    protected List<View<?>> createViews() {
        List<View<?>> outputs = new ArrayList<>(Collections.nCopies(1, null));
        outputs.set(OUTPUT_LOGS, new View<>(createOutputId("logs"), "Logs", LogsData.class));
        return outputs;
    }

    public static class Config {
        private String prefix;

        public String getPrefix() {
            return prefix;
        }

        public void setPrefix(String prefix) {
            this.prefix = prefix;
        }
    }

    public static class LogsData {
        private List<String> lines;

        public List<String> getLines() {
            return lines;
        }

        public void setLines(List<String> lines) {
            this.lines = lines;
        }
    }
}