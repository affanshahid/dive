import { List, ListItem, Skeleton } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { designerService } from '../../services';
import NodeListItem from './NodeListItem';

function NodeList() {
  const { isLoading, data } = useQuery(
    'designerNodes',
    designerService.getNodes
  );

  let children: ReactNode;

  if (isLoading)
    children = new Array(15).fill(0).map((_, i) => (
      <ListItem w="full" key={i}>
        <Skeleton mx={4} height="25px" />
      </ListItem>
    ));
  else
    children = data!.map((node) => (
      <NodeListItem key={node.className} node={node} />
    ));

  return (
    <List py={2} spacing={4}>
      {children}
    </List>
  );
}

export default NodeList;
