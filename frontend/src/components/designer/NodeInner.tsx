import { Button, Flex, Text } from '@chakra-ui/react';
import { INodeInnerDefaultProps } from '@mrblenny/react-flow-chart';
import React, { useCallback, useContext } from 'react';
import { SelectedNodeContext } from './Designer';

function NodeInner({ node }: INodeInnerDefaultProps) {
  const [, setSelectedNodeId] = useContext(SelectedNodeContext)!;
  const handleConfigure = useCallback(() => setSelectedNodeId(node.id), [
    node,
    setSelectedNodeId,
  ]);

  return (
    <Flex py={4} justify="center" align="center" direction="column">
      <Text>{node.properties.label}</Text>
      <Button colorScheme="teal" size="sm" onClick={handleConfigure}>
        Configure
      </Button>
    </Flex>
  );
}

export default NodeInner;
