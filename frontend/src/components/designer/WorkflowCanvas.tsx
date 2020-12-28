import { actions, FlowChart, IChart } from '@mrblenny/react-flow-chart';
import mapValues from 'lodash.mapvalues';
import React, { useMemo } from 'react';
import NodeInner from './NodeInner';
import Port from './Port';

const clone = (d: any) => JSON.parse(JSON.stringify(d));

export interface WorkflowCanvasProps {
  chart: IChart;
  onChange: (fn: (chart: IChart) => IChart) => void;
}

function WorkflowCanvas({ chart, onChange }: WorkflowCanvasProps) {
  const callbacks = useMemo(
    () =>
      mapValues(actions, (func: any, key) => (...args: any) =>
        onChange((chart) => func(...args)(clone(chart)))
      ) as typeof actions,
    [onChange]
  );

  return (
    <FlowChart
      Components={{ NodeInner, Port }}
      config={{
        zoom: {
          pan: { disabled: false },
          wheel: { disabled: true },
        },
      }}
      chart={chart}
      callbacks={callbacks}
    />
  );
}

export default WorkflowCanvas;
