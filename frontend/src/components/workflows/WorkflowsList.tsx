import { Box, Divider, Skeleton } from "@chakra-ui/core";
import React, { Fragment, ReactNode } from "react";
import { useAsync } from "react-async";
import { workflowsService } from "../../services";
import WorkflowListItem from "./WorkflowListItem";

function WorkflowsList() {
  const { data: workflows, error, status, reload } = useAsync(
    workflowsService.findAllUsingGET
  );

  let children: ReactNode;

  if (status === "rejected") return <p>Error: {error!.message}</p>;
  else if (status === "pending")
    children = new Array(5).fill(0).map((_, i) => (
      <Fragment key={i}>
        <Skeleton w="full" height="25px" />
        {i !== 4 && <Divider borderColor="red.200" />}
      </Fragment>
    ));
  else
    children = workflows!.map((workflow, i) => (
      <Fragment key={workflow.id}>
        <WorkflowListItem workflow={workflow} onDelete={reload} />
        {i !== workflows!.length - 1 && <Divider borderColor="red.200" />}
      </Fragment>
    ));

  return <Box>{children}</Box>;
}

export default WorkflowsList;
