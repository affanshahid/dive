import { IChart, INode, IPort } from "@mrblenny/react-flow-chart";
import {
  CreateWorkflowDTO,
  NodeDTOOfobject,
  PortDTO,
} from "../services/generated";

export function chartToDTO(label: string, chart: IChart): CreateWorkflowDTO {
  const nodes: NodeDTOOfobject[] = [];
  const ports: PortDTO[] = [];
  const roots: string[] = [];

  for (let cNode of Object.values(chart.nodes)) {
    const inputPorts: string[] = [];
    const outputPorts: string[] = [];

    let inputCounts = 0;

    for (let cPort of Object.values(cNode.ports).filter(
      (p) => p.type === "left"
    )) {
      const dto = chartPortToDTO(cPort, cNode, chart);

      inputCounts += Math.min(dto.connections.length, 1);

      inputPorts.push(dto.id);
      ports.push(dto);
    }

    for (let cPort of Object.values(cNode.ports).filter(
      (p) => p.type === "right"
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
        "@class": cNode.properties.configClassName,
        ...cNode.properties.config,
      },
      inputPorts: inputPorts,
      outputPorts: outputPorts,
    });

    if (inputCounts === 0) roots.push(cNode.id);
  }

  if (roots.length < 1) throw new Error("no roots detected");
  if (roots.length > 1) throw new Error("multiple roots detected");

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
  return nodeId + "-" + portId;
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
