import {
  Box,
  Flex,
  List,
  ListItem,
  SimpleGrid,
  Skeleton,
} from '@chakra-ui/react';
import React from 'react';

function DesignerSkeleton() {
  return (
    <SimpleGrid columns={12} spacing={0} h="calc(100vh - 86px)">
      <Box gridColumn="1/4" shadow="lg">
        <Flex direction="column" h="full" justify="space-between">
          <Skeleton height="15px" mx={4} my={2} />
          <Skeleton height="40px" mx={4} my={2} />
          <Box flexGrow={2}>
            <List py={2} spacing={4}>
              {new Array(8).fill(0).map((_, i) => (
                <ListItem>
                  <Skeleton key={i} mx={4} height="25px" />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box px={3} py={3}>
            <Skeleton mb={2} height="35px" />
            <Skeleton height="35px" />
          </Box>
        </Flex>
      </Box>
      <Box
        gridColumn="4/13"
        flexGrow={4}
        overflow="hidden"
        backgroundColor="rgba(0,0,0,0.08)"
        backgroundSize="20px 20px"
        backgroundImage="linear-gradient(90deg,hsla(0,0%,100%,.2) 1px,transparent 0), linear-gradient(180deg,hsla(0,0%,100%,.2) 1px,transparent 0);"
      ></Box>
    </SimpleGrid>
  );
}

export default DesignerSkeleton;
