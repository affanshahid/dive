import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from '@chakra-ui/react';
import { IChart } from '@mrblenny/react-flow-chart';
import Form from '@rjsf/core';
import clone from 'lodash.clonedeep';
import React, {
  ChangeEvent,
  Fragment,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useQuery } from 'react-query';
import { designerService } from '../../services';

export interface ConfigDrawerProps {
  selectedNodeId: string | null;
  chart: IChart;
  onClose: () => void;
  onChange: (chart: IChart) => void;
}

function ConfigDrawer({
  selectedNodeId,
  chart,
  onClose,
  onChange,
}: ConfigDrawerProps) {
  const { data: nodes, isLoading } = useQuery(
    'designerNodes',
    designerService.getNodes
  );
  const initialRef = useRef(null);
  const selectedNode = useMemo(() => {
    if (selectedNodeId == null) return null;

    return Object.values(chart.nodes).find(
      (node) => node.id === selectedNodeId
    );
  }, [chart.nodes, selectedNodeId]);

  const handleChange = useCallback(
    (event: any) => {
      if (selectedNodeId == null) return;

      const cloned = clone(chart);
      cloned.nodes[selectedNodeId!].properties.config = event.formData;
      onChange(cloned);
    },
    [chart, onChange, selectedNodeId]
  );

  const configSchema = useMemo(() => {
    if (selectedNode == null || nodes == null) return;

    const node = nodes.find(
      (node) => node.configClassName === selectedNode.properties.configClassName
    );
    return node?.configSchema;
  }, [nodes, selectedNode]);

  const handleLabelChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (selectedNode == null) return;

      const cloned = clone(chart);

      cloned.nodes[selectedNode.id].properties.label = event.target.value;
      onChange(cloned);
    },
    [chart, onChange, selectedNode]
  );

  let body: ReactNode = null;

  if (isLoading) body = <Spinner size="xl" />;

  if (selectedNode != null)
    body = (
      <Fragment>
        <FormControl id="label">
          <FormLabel htmlFor="label">Label</FormLabel>
          <Input
            ref={initialRef}
            type="text"
            aria-describedby="enter-label"
            value={selectedNode!.properties.label}
            onChange={handleLabelChange}
          />
        </FormControl>
        <Form
          formData={selectedNode.properties.config}
          schema={configSchema!}
          onChange={handleChange}
        >
          <button type="submit" style={{ display: 'none' }} />
        </Form>
      </Fragment>
    );

  return (
    <Drawer
      initialFocusRef={initialRef}
      placement="right"
      isOpen={selectedNodeId != null}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{selectedNode?.properties.label}</DrawerHeader>
        <DrawerBody>{body}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default ConfigDrawer;
