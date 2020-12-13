import { Box, Button, useToast } from '@chakra-ui/react';
import { noop } from '@mrblenny/react-flow-chart';
import React, { useCallback } from 'react';
import { useAsync } from 'react-async';
import { useResetRecoilState } from 'recoil';
import { WorkflowDTO } from '../../services/generated';
import { chartState } from '../../state/designer';
import { extractResponseError } from '../../utils/errors';

export interface WorkflowButtonsProps {
  doSave: () => Promise<WorkflowDTO>;
  afterSave?: (dto: WorkflowDTO) => void;
}

function WorkflowButtons({ doSave, afterSave = noop }: WorkflowButtonsProps) {
  const toast = useToast();
  const resetChart = useResetRecoilState(chartState);

  const onSaveSuccess = useCallback(
    (dto: WorkflowDTO) => {
      toast({
        status: 'success',
        title: 'Saved',
      });

      afterSave(dto);
    },
    [afterSave, toast]
  );

  const onSaveFailed = useCallback(
    async (err: any) =>
      toast({
        status: 'error',
        title: 'Error',
        description:
          err instanceof Response
            ? await extractResponseError(err)
            : err.message,
        isClosable: true,
      }),
    [toast]
  );

  const { run, status } = useAsync({
    deferFn: doSave,
    onReject: onSaveFailed,
    onResolve: onSaveSuccess,
  });

  return (
    <Box px={3} py={3}>
      <Button
        isLoading={status === 'pending'}
        w="full"
        mb={2}
        onClick={resetChart}
      >
        Clear
      </Button>
      <Button
        onClick={run}
        isLoading={status === 'pending'}
        w="full"
        colorScheme="teal"
      >
        Save
      </Button>
    </Box>
  );
}

export default WorkflowButtons;
