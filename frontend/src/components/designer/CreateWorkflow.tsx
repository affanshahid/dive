import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { workflowsService } from '../../services';
import { WorkflowDTO } from '../../services/generated';
import {
  designerChart,
  designerChartLabel,
  designerSelectedNodeId,
} from '../../state';
import { chartToDTO } from '../../utils/conversion';
import Layout from '../Layout';
import Designer from './Designer';

function CreateWorkflow() {
  const resetChart = useResetRecoilState(designerChart);
  const resetLabel = useResetRecoilState(designerChartLabel);
  const resetSelectedNode = useResetRecoilState(designerSelectedNodeId);

  const chart = useRecoilValue(designerChart);
  const label = useRecoilValue(designerChartLabel);

  useEffect(() => {
    resetChart();
    resetLabel();
    resetSelectedNode();
  }, [resetChart, resetLabel, resetSelectedNode]);

  const requestFn = useCallback(
    () => workflowsService.createUsingPOST({ dto: chartToDTO(label, chart) }),
    [chart, label]
  );

  const history = useHistory();

  const handleAfterSave = useCallback(
    (dto: WorkflowDTO) => history.push(`/designer/${dto.id}`),
    [history]
  );

  return (
    <Layout>
      <Designer doSave={requestFn} afterSave={handleAfterSave} />
    </Layout>
  );
}

export default CreateWorkflow;
