package com.affanshahid.dive.workflows;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.affanshahid.dive.workflow.WorkflowTree;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

@TypeDefs({ @TypeDef(name = "jsonb", typeClass = JsonBinaryType.class) })
@Entity
public class Workflow {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false)
    private UUID id;

    private String name;

    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private WorkflowTree tree;

    public UUID getId() {
        return id;
    }

    public WorkflowTree getTree() {
        return tree;
    }

    public void setTree(WorkflowTree tree) {
        this.tree = tree;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}