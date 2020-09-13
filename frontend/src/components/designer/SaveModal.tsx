import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/core';
import React, { useCallback, useRef, useState } from 'react';
import useInput from 'react-hanger/useInput';
import { useRecoilState } from 'recoil';
import { workflowsService } from '../../services';
import { chartState } from '../../state/designer';
import { chartToDTO } from '../../utils/conversion';
import { extractResponseError } from '../../utils/errors';

export interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SaveModal({ isOpen, onClose }: SaveModalProps) {
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const label = useInput('');
  const [chart] = useRecoilState(chartState);
  const initialRef = useRef(null);
  const handleSave = useCallback(async () => {
    try {
      setSaving(true);
      const dto = chartToDTO(label.value, chart);
      await workflowsService.createUsingPOST({ dto });
    } catch (err) {
      let msg: string;
      if (err instanceof Response) msg = await extractResponseError(err);
      else msg = err.message;

      toast({
        status: 'error',
        title: 'Error',
        description: msg,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  }, [chart, label.value, toast]);

  return (
    <Modal
      closeOnOverlayClick={!saving}
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Save</ModalHeader>
        <ModalCloseButton isDisabled={saving} />
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              ref={initialRef}
              type="text"
              id="title"
              aria-describedby="enter-title"
              {...label.eventBind}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button isDisabled={saving} mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            isDisabled={saving}
            isLoading={saving}
            variantColor="blue"
            onClick={handleSave}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SaveModal;
