import { Box, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { ChangeEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { chartLabelState } from '../../state/designer';
import NodeList from './NodeList';
import WorkflowButtons, { WorkflowButtonsProps } from './WorkflowButtons';

export interface ControlsProps {
  doSave: WorkflowButtonsProps['doSave'];
  afterSave: WorkflowButtonsProps['afterSave'];
}

function Controls({ doSave, afterSave }: ControlsProps) {
  const [label, setLabel] = useRecoilState(chartLabelState);
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
