import { Box, SimpleGrid } from '@chakra-ui/core';
import React, { Fragment } from 'react';
import ConfigDrawer from './ConfigDrawer';
import Controls, { ControlsProps } from './Controls';
import WorkflowCanvas from './WorkflowCanvas';

export interface DesignerProps {
  doSave: ControlsProps['doSave'];
  afterSave: ControlsProps['afterSave'];
}

function Designer({ doSave, afterSave }: DesignerProps) {
  return (
    <Fragment>
      <ConfigDrawer />
      <SimpleGrid columns={12} spacing={0} h="calc(100vh - 86px)">
        <Box gridColumn="1/4" shadow="lg">
          <Controls doSave={doSave} afterSave={afterSave} />
        </Box>
        <Box gridColumn="4/13" flexGrow={4} overflow="hidden">
          <WorkflowCanvas />
        </Box>
      </SimpleGrid>
    </Fragment>
  );
}

export default Designer;
