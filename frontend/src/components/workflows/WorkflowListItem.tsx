import { Flex } from "@chakra-ui/core";
import React from "react";
import { WorkflowDTOSummaryView } from "../../services/generated";
import DeleteButton from "./DeleteButton";

export interface WorkflowListItemProps {
  workflow: WorkflowDTOSummaryView;
  onDelete?: () => void;
}

function WorkflowListItem({ workflow, onDelete }: WorkflowListItemProps) {
  return (
    <Flex justify="space-between">
      {workflow.name}{" "}
      <DeleteButton workflowId={workflow.id} onDelete={onDelete} />
    </Flex>
  );
}

export default WorkflowListItem;
