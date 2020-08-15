import { List, ListItem, Skeleton } from "@chakra-ui/core";
import React, { ReactNode } from "react";
import usePromise from "react-use-promise";
import { designerService } from "../../services/index";
import NodeListItem from "./NodeListItem";

function NodeList() {
  const [nodes, error, state] = usePromise(
    () => designerService.getNodesUsingGET(),
    []
  );

  let children: ReactNode;

  if (state === "rejected") return <p>Error: {error!.message}</p>;
  else if (state === "pending")
    children = new Array(15).fill(0).map((_, i) => (
      <ListItem key={i}>
        <Skeleton w="full" height="20px" />
      </ListItem>
    ));
  else
    children = nodes!.map((node) => (
      <NodeListItem key={node.className} node={node} />
    ));

  return <List py={2}>{children}</List>;
}

export default NodeList;
