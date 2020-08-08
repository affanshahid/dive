package com.affanshahid.dive.workflows;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface WorkflowRepository extends CrudRepository<Workflow, UUID> {
}