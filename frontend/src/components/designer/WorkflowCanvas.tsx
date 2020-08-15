import { actions, FlowChart } from "@mrblenny/react-flow-chart";
import mapValues from "lodash.mapvalues";
import React, { useMemo } from "react";
import { useRecoilState } from "recoil";
import { designerChart } from "../../state";
import NodeInner from "./NodeInner";
import Port from "./Port";

const clone = (d: any) => JSON.parse(JSON.stringify(d));

function WorkflowCanvas() {
  const [chart, setChart] = useRecoilState(designerChart);

  const callbacks = useMemo(
    () =>
      mapValues(actions, (func: any, key) => (...args: any) =>
        setChart((chart) => func(...args)(clone(chart)))
      ) as typeof actions,
    [setChart]
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
