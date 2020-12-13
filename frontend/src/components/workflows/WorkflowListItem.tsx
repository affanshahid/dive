import { ViewIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { WorkflowDTOSummary } from '../../services/generated';
import DeleteButton from './DeleteButton';

export interface WorkflowListItemProps {
  workflow: WorkflowDTOSummary;
  onDelete?: () => void;
}

function WorkflowListItem({ workflow, onDelete }: WorkflowListItemProps) {
  return (
    <Flex justify="space-between">
      {workflow.name}{' '}
      <Box>
        <Link to={`/designer/${workflow.id}`}>
          <ViewIcon mr={2} />
        </Link>
        <DeleteButton workflowId={workflow.id} onDelete={onDelete} />
      </Box>
    </Flex>
  );
}

export default WorkflowListItem;
