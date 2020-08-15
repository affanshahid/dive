import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import React from "react";
import NodeInner from "./NodeInner";
import Port from "./Port";

const initialState = {
  offset: {
    x: 0,
    y: 0,
  },
  scale: 1,
  nodes: {},
  links: {},
  selected: {},
  hovered: {},
};

function WorkflowCanvas() {
  return (
    <FlowChartWithState
      Components={{ NodeInner, Port }}
      config={{ zoom: { pan: { disabled: false }, wheel: { disabled: true } } }}
      initialValue={initialState}
    />
  );
}

export default WorkflowCanvas;
