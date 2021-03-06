import { ListIcon, ListItem } from '@chakra-ui/react';
import { IPort, REACT_FLOW_CHART } from '@mrblenny/react-flow-chart';
import React, { DragEvent, useCallback, useMemo } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineFilter, AiOutlineRead } from 'react-icons/ai';
import { GoGraph } from 'react-icons/go';
import { DesignerNodeDTO } from '../../services/generated';
import { ChartNodeProperties } from '../../utils/helpers';

export type Payload = {
  ports: Record<string, Partial<IPort>>;
  properties: ChartNodeProperties;
};

const iconMapping: Record<string, IconType> = {
  readers: AiOutlineRead,
  operators: AiOutlineFilter,
  outputs: GoGraph,
};

export interface NodeListItemProps {
  node: DesignerNodeDTO;
}

function NodeListItem({ node }: NodeListItemProps) {
  const payload: Payload = useMemo(() => {
    const result: Payload = {
      ports: {},
      properties: {
        label: nodeName(node),
        className: node.className,
        configClassName: node.configClassName,
        config: {},
      },
    };

    for (const label of node.inputPorts) {
      result.ports[label] = {
        id: label,
        type: 'left',
      };
    }

    for (const label of node.outputPorts) {
      result.ports[label] = {
        id: label,
        type: 'right',
      };
    }

    return result;
  }, [node]);

  const handleDragStart = useCallback(
    (event: DragEvent) =>
      event.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify(payload)),
    [payload]
  );

  return (
    <ListItem
      borderRadius={3}
      px={4}
      py={1}
      mb={4}
      bg="white"
      draggable={true}
      onDragStart={handleDragStart}
    >
      <ListIcon as={iconMapping[node.type]} color="black.500" />
      {nodeName(node)}
    </ListItem>
  );
}

export default NodeListItem;

export function nodeName(node: DesignerNodeDTO) {
  const segments = node.className.split('.');
  return segments[segments.length - 1];
}
