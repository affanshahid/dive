import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Spinner,
} from '@chakra-ui/react';
import { IChart } from '@mrblenny/react-flow-chart';
import React, { ReactNode, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { queryClient } from '../../query-client';
import { workflowsService } from '../../services';
import { chartToDTO, dtoToChart } from '../../utils/conversion';
import { throwErrorMessage } from '../../utils/errors';
import Layout from '../Layout';
import Designer from './Designer';

function ViewWorkflow() {
  const history = useHistory();
  const { workflowId } = useParams<any>();
  const { isLoading, isError, error, data } = useQuery(
    ['workflows', workflowId],
    () =>
      workflowsService
        .findById({ id: workflowId })
        .then((wf) => dtoToChart(wf.tree))
        .catch(throwErrorMessage)
  );

  const handleSubmit = useCallback(
    async (label: string, chart: IChart) => {
      const result = await workflowsService.update({
        id: workflowId,
        updateWorkflowDTO: chartToDTO(label, chart),
      });

      await queryClient.invalidateQueries(['workflows', workflowId]);
      history.push(`/designer/${result.id}`);
    },
    [history, workflowId]
  );

  let children: ReactNode;

  if (isError)
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Failed to load workflow</AlertTitle>
        <AlertDescription>{error as any}</AlertDescription>
      </Alert>
    );
  else if (isLoading) children = <Spinner />;
  else children = <Designer onSubmit={handleSubmit} initialChartState={data} />;

  return <Layout>{children}</Layout>;
}

export default ViewWorkflow;
