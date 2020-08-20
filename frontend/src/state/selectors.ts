import clone from 'lodash.clonedeep';
import { selector, selectorFamily } from 'recoil';
import { designerService } from '../services';
import { extractResponseError } from '../utils/errors';
import { designerChart, designerSelectedNodeId } from './atoms';

export const designerNodes = selector({
  key: 'designerNodes',
  async get({ get }) {
    try {
      return await designerService.getNodesUsingGET();
    } catch (err) {
      throw new Error(await extractResponseError(err));
    }
  },
});

export const designerNodeConfigSchema = selectorFamily({
  key: 'designerNodeConfigSchema',
  get: (configClass: string) => ({ get }) => {
    const nodeList = get(designerNodes);

    const node = nodeList.find((node) => node.configClassName === configClass);
    if (node == null)
      throw new Error(
        'node config schema not found with class: ' + configClass
      );

    return node.configSchema;
  },
});

export const designerSelectedNode = selector({
  key: 'designerSelectedNode',
  get({ get }) {
    const id = get(designerSelectedNodeId);
    if (id == null) return null;

    const chart = get(designerChart);
    return Object.values(chart.nodes).find((node) => node.id === id)!;
  },
});

export const designerSelectedNodeLabel = selector<string | null>({
  key: 'designerSelectedNodeProperties',
  get({ get }) {
    return get(designerSelectedNode)?.properties.label;
  },
  set({ get, set }, label) {
    const node = get(designerSelectedNode);
    if (node == null) return;

    const chart = get(designerChart);
    const cloned = clone(chart);

    cloned.nodes[node.id].properties.label = label;
    set(designerChart, cloned);
  },
});

export const designerSelectedNodeConfigSchema = selector({
  key: 'designerSelectedNodeConfigSchema',
  get({ get }) {
    const node = get(designerSelectedNode);
    if (node == null) return null;

    return get(designerNodeConfigSchema(node.properties.configClassName));
  },
});

export const designerSelectedNodeConfig = selector({
  key: 'designerSelectedNodeConfig',
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
