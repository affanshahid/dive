import clone from "lodash.clonedeep";
import { selector } from "recoil";
import { designerChart, designerSelectedNodeId } from "./atoms";

export const designerSelectedNode = selector({
  key: "designerSelectedNode",
  get({ get }) {
    const id = get(designerSelectedNodeId);
    if (id == null) return null;

    const chart = get(designerChart);
    return Object.values(chart.nodes).find((node) => node.id === id)!;
  },
});

export const designerSelectedNodeConfig = selector({
  key: "designerSelectedNodeConfig",
  get({ get }) {
    return get(designerSelectedNode)?.properties.config;
  },
  set({ get, set }, config) {
    const node = get(designerSelectedNode);
    if (node == null) return;

    const chart = get(designerChart);
    const cloned = clone(chart);

    cloned.nodes[node.id].properties.config = config;
    set(designerChart, cloned);
  },
});
