import React from 'react';
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { PractitionerInfo } from '@c4c/monarch/common';
import { controller } from './actionsController';

const AddPractitioner: React.FC<{
  accessToken: string;
  practitioner: PractitionerInfo;
  setReload?: (arg: boolean) => void;
}> = ({ accessToken, practitioner, setReload }) => {
  const {
    isOpen: isAcceptOpen,
    onOpen: onAcceptOpen,
    onClose: onAcceptClose,
  } = useDisclosure();
  const {
    isOpen: isDenyOpen,
    onOpen: onDenyOpen,
    onClose: onDenyClose,
  } = useDisclosure();

  const { uuid } = practitioner;
  const key = { uuid };

  const handleAcceptFormSubmission = async () => {
    controller.postTherapist(practitioner, accessToken);
    // Remove therapist from PendingPractitioners table
    controller.deleteApplicant(key, accessToken);
    console.log('Successfully added new therapist');
    if (setReload) {
      setReload(true);
    }
  };

  const handleDenyFormSubmission = async () => {
    // Remove therapist from PendingPractitioners table
    await controller.deleteApplicant(key, accessToken);
    console.log('Successfully denied new therapist');
    if (setReload) {
      setReload(true);
    }
  };

  return (
    <>
      <span>
        <Button onClick={onAcceptOpen} colorScheme="green" size="sm">
          Accept
        </Button>

        <Modal
          isOpen={isAcceptOpen}
          onClose={() => {
            onAcceptClose();
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Practitioner</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to accept this practitioner?
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  onAcceptClose();
                }}
                variant="ghost"
                mr={2}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onAcceptClose();
                  handleAcceptFormSubmission();
                }}
                colorScheme="teal"
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </span>
      <span style={{ paddingLeft: '10px' }}>
        <Button onClick={onDenyOpen} colorScheme="red" size="sm">
          Deny
        </Button>

        <Modal
          isOpen={isDenyOpen}
          onClose={() => {
            onDenyClose();
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Deny New Practitioner</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to deny this practitioner?
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  onDenyClose();
                }}
                variant="ghost"
                mr={2}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onDenyClose();
                  handleDenyFormSubmission();
                }}
                colorScheme="teal"
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </span>
    </>
  );
};

export default AddPractitioner;
