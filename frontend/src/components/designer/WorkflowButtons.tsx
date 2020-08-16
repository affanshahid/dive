import { Box, Button, useDisclosure } from "@chakra-ui/core";
import React, { Fragment } from "react";
import { useResetRecoilState } from "recoil";
import { designerChart } from "../../state";
import SaveModal from "./SaveModal";

function WorkflowButtons() {
  const resetChart = useResetRecoilState(designerChart);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <Box px={3} py={3}>
        <Button w="full" mb={2} onClick={resetChart}>
          Clear
        </Button>
        <Button onClick={onOpen} w="full" variantColor="teal">
          Save
        </Button>
      </Box>

      <SaveModal isOpen={isOpen} onClose={onClose} />
    </Fragment>
  );
}

export default WorkflowButtons;
