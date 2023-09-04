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
import { Practitioner } from '@c4c/monarch/common';
import { controller } from './actionsController';

const AddPractitioner: React.FC<{ accessToken: string, practitioner: Practitioner, removeApplication: (() => void) }> = ({accessToken, practitioner, removeApplication}) => {
    const { isOpen: isAcceptOpen, onOpen: onAcceptOpen, onClose: onAcceptClose } = useDisclosure();
    const { isOpen: isDenyOpen, onOpen: onDenyOpen, onClose: onDenyClose } = useDisclosure();

    const handleAcceptFormSubmission = async () => {
        console.log(practitioner);
        const therapist = await controller.postTherapist(practitioner, accessToken);
        console.log('Successfully added new therapist');
        console.log(therapist);
        removeApplication();
    }

    const handleDenyFormSubmission = async () => {
        console.log('Successfully denied new therapist');
        removeApplication();
    }

    return (
        <>
            <Button onClick={onAcceptOpen} colorScheme='teal' size='sm'>Accept</Button>

            <Modal isOpen={isAcceptOpen} onClose={() => {
                onAcceptClose();
            }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Practitioner</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to accept this practitioner?                    
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            onAcceptClose();
                            //setPractitioner(defaultPractitioner);
                        }} variant='ghost' mr={2}>Cancel</Button>
                        <Button onClick={() => {
                            onAcceptClose();
                            handleAcceptFormSubmission();
                        }} colorScheme='teal'>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Button onClick={onDenyOpen} colorScheme='teal' size='sm'>Deny</Button>

            <Modal isOpen={isDenyOpen} onClose={() => {
                onDenyClose();
            }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Deny New Practitioner</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    Are you sure you want to deny this practitioner?
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            onDenyClose();
                        }} variant='ghost' mr={2}>Cancel</Button>
                        <Button onClick={() => {
                            onDenyClose(); 
                            handleDenyFormSubmission();
                            }} colorScheme='teal'>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddPractitioner;