import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/core";
import Form from "@rjsf/core";
import React, { ReactNode, useCallback } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  designerSelectedNode,
  designerSelectedNodeConfig,
  designerSelectedNodeId,
} from "../../state";

function ConfigDrawer() {
  const selectedNode = useRecoilValue(designerSelectedNode);
  const resetSelectedNode = useResetRecoilState(designerSelectedNodeId);
  const setConfig = useSetRecoilState(designerSelectedNodeConfig);
  const handleChange = useCallback((event: any) => setConfig(event.formData), [
    setConfig,
  ]);

  let body: ReactNode = null;

  if (selectedNode != null)
    body = (
      <Form
        formData={selectedNode.properties.config}
        schema={selectedNode.properties.configSchema}
        onChange={handleChange}
      >
        <button type="submit" style={{ display: "none" }} />
      </Form>
    );

  return (
    <Drawer
      placement="right"
      isOpen={selectedNode != null}
      onClose={resetSelectedNode}
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
