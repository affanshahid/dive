import { IChart } from '@mrblenny/react-flow-chart';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { queryClient } from '../../query-client';
import { workflowsService } from '../../services';
import { chartToDTO } from '../../utils/conversion';
import Layout from '../Layout';
import Designer from './Designer';

function CreateWorkflow() {
  const history = useHistory();

  const handleSubmit = useCallback(
    async (label: string, chart: IChart) => {
      const result = await workflowsService.create({
        createWorkflowDTO: chartToDTO(label, chart),
      });

      await queryClient.invalidateQueries(['workflows', result.id]);
      history.push(`/designer/${result.id}`);
    },
    [history]
  );

  return (
    <Layout>
      <Designer onSubmit={handleSubmit} />
    </Layout>
  );
}

export default CreateWorkflow;
