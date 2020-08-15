import { Box, SimpleGrid } from "@chakra-ui/core";
import React from "react";
import Layout from "../Layout";
import NodeList from "./NodeList";
import WorkflowCanvas from "./WorkflowCanvas";

function Designer() {
  return (
    <Layout>
      <SimpleGrid columns={12} spacing={0} h="calc(100vh - 86px)">
        <Box gridColumn="1/4" shadow="lg">
          <NodeList />
        </Box>
        <Box gridColumn="4/13" flexGrow={4} overflow="hidden">
          <WorkflowCanvas />
        </Box>
      </SimpleGrid>
    </Layout>
  );
}

export default Designer;
