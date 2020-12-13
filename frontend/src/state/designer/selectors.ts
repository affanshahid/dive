import clone from 'lodash.clonedeep';
import { selector, selectorFamily } from 'recoil';
import { designerService } from '../../services';
import { extractResponseError } from '../../utils/errors';
import { chartState, selectedNodeIdState } from './atoms';

export const nodesState = selector({
  key: 'designer/nodesState',
  async get({ get }) {
    try {
      return await designerService.getNodes();
    } catch (err) {
      throw new Error(await extractResponseError(err));
    }
  },
});

export const nodeConfigSchemaState = selectorFamily({
  key: 'designer/nodeConfigSchemaState',
  get: (configClass: string) => ({ get }) => {
    const nodeList = get(nodesState);

    const node = nodeList.find((node) => node.configClassName === configClass);
    if (node == null)
      throw new Error(
        'node config schema not found with class: ' + configClass
      );

    return node.configSchema;
  },
});

export const selectedNodeState = selector({
  key: 'designer/selectedNodeState',
  get({ get }) {
    const id = get(selectedNodeIdState);
    if (id == null) return null;

    const chart = get(chartState);
    return Object.values(chart.nodes).find((node) => node.id === id)!;
  },
});

export const selectedNodeLabelState = selector<string | null>({
  key: 'designer/selectedNodeLabelState',
  get({ get }) {
    return get(selectedNodeState)?.properties.label;
  },
  set({ get, set }, label) {
    const node = get(selectedNodeState);
    if (node == null) return;

    const chart = get(chartState);
    const cloned = clone(chart);

    cloned.nodes[node.id].properties.label = label;
    set(chartState, cloned);
  },
});

export const selectedNodeConfigSchemaState = selector({
  key: 'designer/selectedNodeConfigSchemaState',
  get({ get }) {
    const node = get(selectedNodeState);
    if (node == null) return null;

    return get(nodeConfigSchemaState(node.properties.configClassName));
  },
});

export const selectedNodeConfigState = selector({
  key: 'designer/selectedNodeConfigState',
  get({ get }) {
    return get(selectedNodeState)?.properties.config;
  },
  set({ get, set }, config) {
    const node = get(selectedNodeState);
    if (node == null) return;

    const chart = get(chartState);
    const cloned = clone(chart);

    cloned.nodes[node.id].properties.config = config;
    set(chartState, cloned);
  },
});
