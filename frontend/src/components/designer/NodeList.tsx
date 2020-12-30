import { List } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { designerService } from '../../services';
import NodeListItem from './NodeListItem';

function NodeList() {
  const { data } = useQuery('designerNodes', designerService.getNodes);

  return (
    <List py={2} spacing={4}>
      {data!.map((node) => (
        <NodeListItem key={node.className} node={node} />
      ))}
    </List>
  );
}

export default NodeList;
