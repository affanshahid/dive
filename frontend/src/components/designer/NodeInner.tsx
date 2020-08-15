import { Flex } from "@chakra-ui/core";
import { INodeInnerDefaultProps } from "@mrblenny/react-flow-chart";
import React from "react";

function NodeInner({ node }: INodeInnerDefaultProps) {
  return (
    <Flex py={4} justify="center" align="center">
      {node.properties.label}
    </Flex>
  );
}

export default NodeInner;
