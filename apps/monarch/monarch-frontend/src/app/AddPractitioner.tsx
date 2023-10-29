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

const AddPractitioner: React.FC<{ accessToken: string, practitioner: Practitioner, setReload }> = ({ accessToken, practitioner, setReload }) => {
    const { isOpen: isAcceptOpen, onOpen: onAcceptOpen, onClose: onAcceptClose } = useDisclosure();
    const { isOpen: isDenyOpen, onOpen: onDenyOpen, onClose: onDenyClose } = useDisclosure();

    const handleAcceptFormSubmission = async () => {
        controller.postTherapist(practitioner, accessToken);
        // Remove therapist from PendingPractitioners table
        const phoneNumber = practitioner.phoneNumber;
        const fullName = practitioner.fullName;
        const key = { phoneNumber: phoneNumber, fullName: fullName };
        controller.deleteApplicant(key, accessToken);
        console.log('Successfully added new therapist');
        setReload(true);
    }

    const handleDenyFormSubmission = async () => {
        // Remove therapist from PendingPractitioners table
        const phoneNumber = practitioner.phoneNumber;
        const fullName = practitioner.fullName;
        const key = { phoneNumber, fullName };
        console.log(key);
        await controller.deleteApplicant(key, accessToken);
        console.log('Successfully denied new therapist');
        setReload(true);
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