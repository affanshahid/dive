import { Box, Divider, Skeleton } from '@chakra-ui/react';
import React, { Fragment, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { workflowsService } from '../../services';
import WorkflowListItem from './WorkflowListItem';

function WorkflowsList() {
  const { isLoading, isError, error, data, refetch } = useQuery(
    'workflows',
    workflowsService.findAll
  );

  let children: ReactNode;

  if (isError) return <p>Error: {error}</p>;
  else if (isLoading)
    children = new Array(5).fill(0).map((_, i) => (
      <Fragment key={i}>
        <Skeleton my={2} w="full" height="25px" />
        {i !== 4 && <Divider borderColor="red.200" />}
      </Fragment>
    ));
  else
    children = data!.map((workflow, i) => (
      <Fragment key={workflow.id}>
        <WorkflowListItem workflow={workflow} onDelete={refetch} />
        {i !== data!.length - 1 && <Divider borderColor="red.200" />}
      </Fragment>
    ));

  return <Box>{children}</Box>;
}

export default WorkflowsList;
