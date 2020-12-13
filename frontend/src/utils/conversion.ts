import { IChart, INode, IPort } from '@mrblenny/react-flow-chart';
import { v4 as uuid } from 'uuid';
import {
  CreateWorkflowDTO,
  NodeDTOObject,
  PortDTO,
  WorkflowTreeDTO,
} from '../services/generated';
import { createChartNodeProperties } from './helpers';

export function chartToDTO(label: string, chart: IChart): CreateWorkflowDTO {
  const nodes: NodeDTOObject[] = [];
  const ports: PortDTO[] = [];
  const roots: string[] = [];

  for (let cNode of Object.values(chart.nodes)) {
    const inputPorts: string[] = [];
    const outputPorts: string[] = [];

    let inputCounts = 0;

    for (let cPort of Object.values(cNode.ports).filter(
      (p) => p.type === 'left'
    )) {
      const dto = chartPortToDTO(cPort, cNode, chart);

      inputCounts += Math.min(dto.connections.length, 1);

      inputPorts.push(dto.id);
      ports.push(dto);
    }

    for (let cPort of Object.values(cNode.ports).filter(
      (p) => p.type === 'right'
    )) {
      const dto = chartPortToDTO(cPort, cNode, chart);

      outputPorts.push(dto.id);
      ports.push(dto);
    }

    nodes.push({
      id: cNode.id,
      _class: cNode.properties.className,
      label: cNode.properties.label,
      config: {
        '@class': cNode.properties.configClassName,
        ...cNode.properties.config,
      },
      inputPorts: inputPorts,
      outputPorts: outputPorts,
    });

    if (inputCounts === 0) roots.push(cNode.id);
  }

  if (roots.length < 1) throw new Error('no roots detected');
  if (roots.length > 1) throw new Error('multiple roots detected');

  return {
    name: label,
    tree: {
      nodes: nodes,
      ports: ports,
      root: roots[0],
    },
  };
}

function getPortId(nodeId: string, portId: string) {
  return nodeId + '-' + portId;
}

function chartPortToDTO(port: IPort, node: INode, chart: IChart): PortDTO {
  const id = getPortId(node.id, port.id);

  return {
    id,
    node: node.id,
    label: port.id,
    connections: Object.values(chart.links)
      .filter((l) => l.from.nodeId === node.id && l.from.portId === port.id)
      .map((l) => getPortId(l.to.nodeId!, l.to.portId!))
      .concat(
        Object.values(chart.links)
          .filter((l) => l.to.nodeId === node.id && l.to.portId === port.id)
          .map((l) => getPortId(l.from.nodeId!, l.from.portId!))
      ),
  };
}

export function dtoToChart(dto: WorkflowTreeDTO): IChart {
  const chart: IChart = {
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

  for (let i = 0; i < dto.nodes.length; i++) {
    const node = dto.nodes[i];
    const cNode: INode = (chart.nodes[node.id] = {
      id: node.id,
      ports: {},
      type: node._class,
      position: {
        x: 250 * i,
        y: 100 * i,
      },
      properties: createChartNodeProperties(node),
    });

    const ports = dto.ports.filter((port) => port.node === node.id);

    for (const port of ports) {
      cNode.ports[port.id] = {
        id: port.id,
        type: node.inputPorts.includes(port.id) ? 'left' : 'right',
      };

      if (node.inputPorts.includes(port.id)) continue;

      for (const conn of port.connections) {
        const targetPort = dto.ports.find((p) => p.id === conn)!;

        const linkId = uuid();
        chart.links[linkId] = {
          id: linkId,
          from: {
            nodeId: port.node,
            portId: port.id,
          },
          to: {
            nodeId: targetPort.node,
            portId: targetPort.id,
          },
        };
      }
    }
  }

  return chart;
}
