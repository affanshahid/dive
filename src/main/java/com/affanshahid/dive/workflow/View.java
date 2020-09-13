package com.affanshahid.dive.workflow;

public class View<T> {
    private String id;
    private String label;
    private Class<T> clazz;

    public View() {
    }

    public View(String id, String label, Class<T> clazz) {
        this.id = id;
        this.label = label;
        this.clazz = clazz;
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

    public String getClazz() {
        return clazz.getName();
    }

    public void setClazz(String className) throws ClassNotFoundException {
        @SuppressWarnings("unchecked")
        var clazz = (Class<T>) Class.forName(className);
        this.clazz = clazz;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
