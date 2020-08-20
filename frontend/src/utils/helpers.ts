import { NodeDTOOfobject } from '../services/generated';

export const noop = () => {};

export type Status = 'pending' | 'resolved' | 'rejected';

export type ChartNodeProperties = {
  label: string;
  className: string;
  configClassName: string;
  config: any;
};

export function createChartNodeProperties(
  node: NodeDTOOfobject
): ChartNodeProperties {
  return {
    label: node.label,
    className: node._class,
    configClassName: (node.config as any)?.['@class'],
    config: node.config,
  };
}
