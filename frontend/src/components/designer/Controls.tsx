import { Box, Flex, FormControl, FormLabel, Input } from '@chakra-ui/core';
import React, { ChangeEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { designerChartLabel } from '../../state';
import NodeList from './NodeList';
import WorkflowButtons, { WorkflowButtonsProps } from './WorkflowButtons';

export interface ControlsProps {
  doSave: WorkflowButtonsProps['doSave'];
  afterSave: WorkflowButtonsProps['afterSave'];
}

function Controls({ doSave, afterSave }: ControlsProps) {
  const [label, setLabel] = useRecoilState(designerChartLabel);
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setLabel(event.target.value),
    [setLabel]
  );

  return (
    <Flex direction="column" h="full" justify="space-between">
      <FormControl mx={4}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          type="text"
          id="title"
          aria-describedby="enter-title"
          onChange={handleChangeInput}
          value={label}
        />
      </FormControl>
      <Box flexGrow={2}>
        <NodeList />
      </Box>
      <WorkflowButtons doSave={doSave} afterSave={afterSave} />
    </Flex>
  );
}

export default Controls;
