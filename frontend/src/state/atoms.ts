import { IChart } from "@mrblenny/react-flow-chart";
import { atom } from "recoil";

const initialDesignerChartState: IChart = {
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

export const designerChart = atom({
  key: "designerChart",
  default: initialDesignerChartState,
});

export const designerSelectedNodeId = atom<String | null>({
  key: "designerSelectedNodeId",
  default: null,
});
