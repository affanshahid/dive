import { IChart } from '@mrblenny/react-flow-chart';
import { atom } from 'recoil';

const initialChartState: IChart = {
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

export const chartState = atom({
  key: 'designer/chartState',
  default: initialChartState,
});

export const chartLabelState = atom({
  key: 'designer/chartLabelState',
  default: '',
});

export const selectedNodeIdState = atom<String | null>({
  key: 'designer/selectedNodeIdState',
  default: null,
});
