import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Layout from '../Layout';
import WorkflowsList from './WorkflowsList';

function Workflows() {
  return (
    <Layout>
      <SimpleGrid my={4} columns={12}>
        <Heading gridRow="1/2" gridColumn="4/10">
          Workflows
        </Heading>
        <Box
          p={2}
          borderRadius="0.25rem"
          border="1px solid rgb(226, 232, 240)"
          gridColumn="4/10"
          gridRow="2/3"
        >
          <WorkflowsList />
        </Box>
      </SimpleGrid>
    </Layout>
  );
}

export default Workflows;
