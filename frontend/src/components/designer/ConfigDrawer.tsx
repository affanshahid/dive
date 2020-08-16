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
} from "@chakra-ui/core";
import Form from "@rjsf/core";
import React, {
  ChangeEvent,
  Fragment,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  designerSelectedNode,
  designerSelectedNodeConfig,
  designerSelectedNodeId,
  designerSelectedNodeLabel,
} from "../../state";

function ConfigDrawer() {
  const initialRef = useRef(null);
  const selectedNode = useRecoilValue(designerSelectedNode);
  const resetSelectedNode = useResetRecoilState(designerSelectedNodeId);
  const setConfig = useSetRecoilState(designerSelectedNodeConfig);
  const handleChange = useCallback((event: any) => setConfig(event.formData), [
    setConfig,
  ]);

  const [label, setLabel] = useRecoilState(designerSelectedNodeLabel);
  const handleLabelChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setLabel(event.target.value),
    [setLabel]
  );

  let body: ReactNode = null;

  if (selectedNode != null)
    body = (
      <Fragment>
        <FormControl>
          <FormLabel htmlFor="label">Label</FormLabel>
          <Input
            ref={initialRef}
            type="text"
            id="label"
            aria-describedby="enter-label"
            value={label!}
            onChange={handleLabelChange}
          />
        </FormControl>
        <Form
          formData={selectedNode.properties.config}
          schema={selectedNode.properties.configSchema}
          onChange={handleChange}
        >
          <button type="submit" style={{ display: "none" }} />
        </Form>
      </Fragment>
    );

  return (
    <Drawer
      initialFocusRef={initialRef}
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
