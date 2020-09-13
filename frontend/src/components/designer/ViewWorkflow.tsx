import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Spinner,
} from '@chakra-ui/core';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { workflowsService } from '../../services';
import { WorkflowDTO } from '../../services/generated';
import { chartLabelState, chartState } from '../../state/designer';
import { chartToDTO, dtoToChart } from '../../utils/conversion';
import { extractResponseError } from '../../utils/errors';
import { Status } from '../../utils/helpers';
import Layout from '../Layout';
import Designer from './Designer';

function ViewWorkflow() {
  const { workflowId } = useParams<any>();
  const [status, setStatus] = useState<Status>('pending');
  const [errMsg, setErrMsg] = useState<string | null>();
  const [chart, setChart] = useRecoilState(chartState);
  const [label, setLabel] = useRecoilState(chartLabelState);

  useEffect(() => {
    async function effect() {
      setStatus('pending');
      try {
        const workflow = await workflowsService.findByIdUsingGET({
          id: workflowId,
        });

        setChart(dtoToChart(workflow.tree));
        setLabel(workflow.name);

        setStatus('resolved');
      } catch (err) {
        if (err instanceof Response) setErrMsg(await extractResponseError(err));
        else setErrMsg(err.message);
        setStatus('rejected');
      }
    }

    effect();
  }, [setChart, setLabel, workflowId]);

  const requestFn = useCallback(
    () =>
      workflowsService.updateUsingPATCH({
        id: workflowId,
        dto: chartToDTO(label, chart),
      }),
    [chart, label, workflowId]
  );

  const history = useHistory();

  const handleAfterSave = useCallback(
    (dto: WorkflowDTO) => history.push(`/designer/${dto.id}`),
    [history]
  );

  let children: ReactNode;

  if (status === 'rejected')
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Failed to load workflow</AlertTitle>
        <AlertDescription>{errMsg}</AlertDescription>
      </Alert>
    );
  else if (status === 'pending') children = <Spinner />;
  else children = <Designer doSave={requestFn} afterSave={handleAfterSave} />;

  return <Layout>{children}</Layout>;
}

export default ViewWorkflow;
