package com.affanshahid.dive.workflow.operators;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.affanshahid.dive.workflow.Node;
import com.affanshahid.dive.workflow.Port;
import com.kjetland.jackson.jsonSchema.annotations.JsonSchemaInject;

public class Filter extends Node<Filter.Config> {
    public static final int PORT_IN_DATA = 0;

    public static final int PORT_OUT_SELECTED = 0;
    public static final int PORT_OUT_FILTERED = 1;

    public Filter(String id, String label) {
        super(id, label, new Filter.Config());
    }

    @Override
    protected List<Port> createInputPorts() {
        List<Port> ports = new ArrayList<>(Collections.nCopies(1, null));
        ports.set(PORT_IN_DATA, new Port(createPortId("data"), "Data", this));
        return ports;
    }

    @Override
    protected List<Port> createOutputPorts() {
        List<Port> ports = new ArrayList<>(Collections.nCopies(2, null));

        ports.set(PORT_OUT_SELECTED, new Port(createPortId("selected"), "Selected", this));
        ports.set(PORT_OUT_FILTERED, new Port(createPortId("filtered"), "Filtered", this));

        return ports;
    }

    public static class Config {
        private String filterKey;

        @JsonSchemaInject(json = "{\"oneOf\":[{\"type\":\"string\",\"title\":\"string\"},{\"type\":\"number\",\"title\":\"number\"}]\n}")
        private Object filterValue;

        public Object getFilterValue() {
            return filterValue;
        }

        public void setFilterValue(Object filterValue) {
            this.filterValue = filterValue;
        }

        public String getFilterKey() {
            return filterKey;
        }

        public void setFilterKey(String filterKey) {
            this.filterKey = filterKey;
        }
    }
}