import { Box, SimpleGrid } from '@chakra-ui/react';
import { IChart } from '@mrblenny/react-flow-chart';
import React, { createContext, Fragment, useCallback, useState } from 'react';
import ConfigDrawer from './ConfigDrawer';
import Controls from './Controls';
import WorkflowCanvas from './WorkflowCanvas';

const defaultChartState: () => IChart = () => ({
  offset: {
    x: 0,
    y: 0,
  },
  scale: 1,
  nodes: {},
  links: {},
  selected: {},
  hovered: {},
});

export type UseSelectedNodeState = [string | null, (id: string) => void];

export const SelectedNodeContext = createContext<UseSelectedNodeState | null>(
  null
);

export interface DesignerProps {
  onSubmit: (label: string, chart: IChart) => Promise<void>;
  initialChartState?: IChart;
}

function Designer({ onSubmit, initialChartState }: DesignerProps) {
  const [label, setLabel] = useState('');
  const [chart, setChart] = useState(initialChartState ?? defaultChartState());
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleClear = useCallback(() => setChart(defaultChartState()), []);
  const handleSubmit = useCallback(() => onSubmit(label, chart), [
    chart,
    label,
    onSubmit,
  ]);

  const handleConfigDrawerClose = useCallback(
    () => setSelectedNodeId(null),
    []
  );

  return (
    <Fragment>
      <ConfigDrawer
        chart={chart}
        onChange={setChart}
        onClose={handleConfigDrawerClose}
        selectedNodeId={selectedNodeId}
      />
      <SimpleGrid columns={12} spacing={0} h="calc(100vh - 86px)">
        <Box gridColumn="1/4" shadow="lg">
          <Controls
            onSubmit={handleSubmit}
            onClear={handleClear}
            label={label}
            onChangeLabel={setLabel}
          />
        </Box>
        <Box gridColumn="4/13" flexGrow={4} overflow="hidden">
          <SelectedNodeContext.Provider
            value={[selectedNodeId, setSelectedNodeId]}
          >
            <WorkflowCanvas chart={chart} onChange={setChart} />
          </SelectedNodeContext.Provider>
        </Box>
      </SimpleGrid>
    </Fragment>
  );
}

export default Designer;
