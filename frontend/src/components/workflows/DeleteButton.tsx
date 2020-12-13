import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { workflowsService } from '../../services';
import { extractResponseError } from '../../utils/errors';
import { noop } from '../../utils/helpers';

export interface DeleteButtonProps {
  workflowId: string;
  onDelete?: () => void;
}

function DeleteButton({ workflowId, onDelete = noop }: DeleteButtonProps) {
  const toast = useToast();
  const handleDelete = useCallback(async () => {
    try {
      toast({
        status: 'info',
        title: 'Deleting',
      });
      await workflowsService._delete({ id: workflowId });
      toast({
        status: 'success',
        title: 'Deleted',
      });
      onDelete();
    } catch (err) {
      let msg: string;
      if (err instanceof Response) {
        msg = await extractResponseError(err);
      } else {
        msg = err.message;
      }

      toast({
        status: 'error',
        title: 'Error',
        description: msg,
        isClosable: true,
      });
    }
  }, [onDelete, toast, workflowId]);

  return (
    <Popover>
      <PopoverTrigger>
        <DeleteIcon cursor="pointer" color="red.500" />
      </PopoverTrigger>
      <PopoverContent zIndex={4}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Are you sure you want to delete this workflow?
        </PopoverHeader>

        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row-reverse"
          pb={4}
        >
          <Button onClick={handleDelete} size="sm" colorScheme="red">
            Yes
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default DeleteButton;
