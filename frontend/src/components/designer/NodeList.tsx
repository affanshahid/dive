import { List, ListItem, Skeleton } from "@chakra-ui/core";
import React, { ReactNode } from "react";
import { useAsync } from "react-async";
import { designerService } from "../../services/index";
import NodeListItem from "./NodeListItem";

function NodeList() {
  const { data: nodes, error, status } = useAsync(
    designerService.getNodesUsingGET
  );

  let children: ReactNode;

  if (status === "rejected") return <p>Error: {error!.message}</p>;
  else if (status === "pending")
    children = new Array(15).fill(0).map((_, i) => (
      <ListItem w="full" key={i}>
        <Skeleton mx={4} height="25px" />
      </ListItem>
    ));
  else
    children = nodes!.map((node) => (
      <NodeListItem key={node.className} node={node} />
    ));

  return (
    <List py={2} spacing={4}>
      {children}
    </List>
  );
}

export default NodeList;
