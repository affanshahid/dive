package com.affanshahid.dive.workflow.readers;

import static java.util.Collections.nCopies;

import java.util.ArrayList;
import java.util.List;

import com.affanshahid.dive.workflow.Node;
import com.affanshahid.dive.workflow.Port;

public class JSONReader extends Node<JSONReader.Config> {
    public static final int PORT_OUT_DATA = 0;

    public JSONReader(String id, String label) {
        super(id, label, new JSONReader.Config());
    }

    @Override
    protected List<Port> createInputPorts() {
        return new ArrayList<>();
    }

    @Override
    protected List<Port> createOutputPorts() {
        List<Port> outputs = new ArrayList<>(nCopies(1, null));
        outputs.set(PORT_OUT_DATA, new Port(createPortId("data"), "Data", this));
        return outputs;
    }

    public static class Config {
        private String source;
        private boolean isJSONLines;

        public boolean isJSONLines() {
            return isJSONLines;
        }

        public void setJSONLines(boolean isJSONLines) {
            this.isJSONLines = isJSONLines;
        }

        public String getSource() {
            return source;
        }

        public void setSource(String source) {
            this.source = source;
        }
    }
}