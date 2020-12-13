package com.affanshahid.dive.workflow;

public class View<T> {
    private String id;
    private String label;
    private Class<T> dataClass;

    public View() {
    }

    public View(String id, String label, Class<T> clazz) {
        this.id = id;
        this.label = label;
        this.dataClass = clazz;
    }

    public String getLabel() {
        return label;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDataClass() {
        return dataClass.getName();
    }

    public void setDataClass(String className) throws ClassNotFoundException {
        @SuppressWarnings("unchecked")
        var clazz = (Class<T>) Class.forName(className);
        this.dataClass = clazz;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
