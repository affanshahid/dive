import { Box, Flex, Icon } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { WorkflowDTOSummaryView } from '../../services/generated';
import DeleteButton from './DeleteButton';

export interface WorkflowListItemProps {
  workflow: WorkflowDTOSummaryView;
  onDelete?: () => void;
}

function WorkflowListItem({ workflow, onDelete }: WorkflowListItemProps) {
  return (
    <Flex justify="space-between">
      {workflow.name}{' '}
      <Box>
        <Link to={`/designer/${workflow.id}`}>
          <Icon mr={2} name="view" />
        </Link>
        <DeleteButton workflowId={workflow.id} onDelete={onDelete} />
      </Box>
    </Flex>
  );
}

export default WorkflowListItem;
