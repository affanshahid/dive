import { Button, Flex, Text } from "@chakra-ui/core";
import { INodeInnerDefaultProps } from "@mrblenny/react-flow-chart";
import React, { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { designerSelectedNodeId } from "../../state";

function NodeInner({ node }: INodeInnerDefaultProps) {
  const setSelectedNodeId = useSetRecoilState(designerSelectedNodeId);
  const handleConfigure = useCallback(() => setSelectedNodeId(node.id), [
    node,
    setSelectedNodeId,
  ]);

  return (
    <Flex py={4} justify="center" align="center" direction="column">
      <Text>{node.properties.label}</Text>
      <Button variantColor="teal" size="sm" onClick={handleConfigure}>
        Configure
      </Button>
    </Flex>
  );
}

export default NodeInner;