import { Box, Divider, Skeleton } from '@chakra-ui/react';

export function WorkflowListSkeleton() {
  return (
    <Box>
      <Skeleton my={2} w="full" height="25px" />
      <Divider borderColor="red.200" />
      <Skeleton my={2} w="full" height="25px" />
      <Divider borderColor="red.200" />
      <Skeleton my={2} w="full" height="25px" />
      <Divider borderColor="red.200" />
      <Skeleton my={2} w="full" height="25px" />
      <Divider borderColor="red.200" />
      <Skeleton my={2} w="full" height="25px" />
    </Box>
  );
}
