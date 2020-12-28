import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { ChangeEvent, useCallback } from 'react';
import { useAsync } from '../../hooks/useAsync';
import NodeList from './NodeList';

export interface ControlsProps {
  label: string;
  onSubmit: () => any;
  onClear: () => void;
  onChangeLabel: (label: string) => void;
}

function Controls({ onSubmit, onClear, label, onChangeLabel }: ControlsProps) {
  const { run, status } = useAsync(onSubmit);
  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onChangeLabel(event.target.value),
    [onChangeLabel]
  );

  return (
    <Flex direction="column" h="full" justify="space-between">
      <FormControl px={4}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          type="text"
          id="title"
          aria-describedby="enter-title"
          onChange={handleChangeInput}
          value={label}
          disabled={status === 'pending'}
        />
      </FormControl>
      <Box flexGrow={2}>
        <NodeList />
      </Box>
      <Box px={3} py={3}>
        <Button
          isLoading={status === 'pending'}
          w="full"
          mb={2}
          onClick={onClear}
        >
          Clear
        </Button>
        <Button
          isLoading={status === 'pending'}
          w="full"
          colorScheme="teal"
          onClick={run}
        >
          Save
        </Button>
      </Box>
    </Flex>
  );
}

export default Controls;
