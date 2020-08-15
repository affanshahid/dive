import { Flex, Tooltip } from "@chakra-ui/core";
import { IPortDefaultProps } from "@mrblenny/react-flow-chart";
import React from "react";
import { ReactComponent as PortIcon } from "../../assets/port.svg";

function Port({ port }: IPortDefaultProps) {
  return (
    <Tooltip aria-label={port.id} label={port.id}>
      <Flex
        w="24px"
        h="24px"
        bg="cornflowerblue"
        cursor="pointer"
        justify="center"
        align="center"
      >
        <PortIcon />
      </Flex>
    </Tooltip>
  );
}

export default Port;
