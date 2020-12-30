import { Box, Divider } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useQuery } from 'react-query';
import { workflowsService } from '../../services';
import WorkflowListItem from './WorkflowListItem';

function WorkflowsList() {
  const { data, refetch } = useQuery('workflows', workflowsService.findAll);

  return (
    <Box>
      {data!.map((workflow, i) => (
        <Fragment key={workflow.id}>
          <WorkflowListItem workflow={workflow} onDelete={refetch} />
          {i !== data!.length - 1 && <Divider borderColor="red.200" />}
        </Fragment>
      ))}
    </Box>
  );
}

export default WorkflowsList;
