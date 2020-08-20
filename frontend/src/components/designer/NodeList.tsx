import { List, ListItem, Skeleton } from '@chakra-ui/core';
import React, { ReactNode } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { designerNodes } from '../../state';
import NodeListItem from './NodeListItem';

function NodeList() {
  const nodesLoadable = useRecoilValueLoadable(designerNodes);

  let children: ReactNode;

  if (nodesLoadable.state === 'hasError')
    return <p>Error: {nodesLoadable.contents.message}</p>;
  else if (nodesLoadable.state === 'loading')
    children = new Array(15).fill(0).map((_, i) => (
      <ListItem w="full" key={i}>
        <Skeleton mx={4} height="25px" />
      </ListItem>
    ));
  else
    children = nodesLoadable.contents.map((node) => (
      <NodeListItem key={node.className} node={node} />
    ));

  return (
    <List py={2} spacing={4}>
      {children}
    </List>
  );
}

export default NodeList;
