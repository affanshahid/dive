import { IChart } from '@mrblenny/react-flow-chart';
import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { queryClient } from '../../query-client';
import { workflowsService } from '../../services';
import { chartToDTO, dtoToChart } from '../../utils/conversion';
import Designer from './Designer';
import { WorkflowControls } from './WorkflowControls';

export interface WorkflowEditorProps {
  workflowId: string;
}

function WorkflowEditor({ workflowId }: WorkflowEditorProps) {
  const { data } = useQuery(['workflows', workflowId], () =>
    workflowsService
      .findById({ id: workflowId })
      .then((wf) => dtoToChart(wf.tree))
  );

  const handleSubmit = useCallback(
    async (label: string, chart: IChart) => {
      await workflowsService.update({
        id: workflowId,
        updateWorkflowDTO: chartToDTO(label, chart),
      });

      await queryClient.invalidateQueries(['workflows', workflowId]);
    },
    [workflowId]
  );

  return (
    <Designer
      controls={<WorkflowControls workflowId={workflowId} />}
      onSubmit={handleSubmit}
      initialChartState={data}
    />
  );
}

export default WorkflowEditor;
