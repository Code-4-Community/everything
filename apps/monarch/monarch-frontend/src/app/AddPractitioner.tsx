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

    // const defaultPractitioner: Practitioner = {
    //     phoneNumber: '',
    //     website: '',
    //     languages: '',
    //     modality: '',
    //     businessLocation: '',
    //     businessName: '',
    //     minAgeServed: '',
    //     email: '',
    //     fullName: '',
    //     languagesList: [],
    //     geocode: {
    //         lat: 0,
    //         long: 0,
    //     }
    // };
    // const [practitioner, setPractitioner] = useState<Practitioner>(defaultPractitioner);

    // const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const phone = {
    //         phoneNumber: event.target.value,
    //     };
    //     setPractitioner((prev: Practitioner) => {
    //         return { ...prev, ...phone};
    //     });
    // };

    // const handleWebsite = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const website = {
    //         website: event.target.value,
    //     };
    //     setPractitioner((prev: Practitioner) => {
    //         return { ...prev, ...website};
    //     });
    // };

    // const handleModality = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const modality = {
    //         modality: event.target.value,
    //     };
    //     setPractitioner((prev: Practitioner) => {
    //         return { ...prev, ...modality};
    //     });
    // };

    // const handleBusinessLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const businessLocation = {
    //         businessLocation: event.target.value,
    //     };
    //     setPractitioner((prev: Practitioner) => {
    //         return { ...prev, ...businessLocation};
    //     });
    // };

    // const handleBusinessName = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const name = {
    //         businessName: event.target.value,
    //     };
    //     setPractitioner((prev: Practitioner) => {
    //         return { ...prev, ...name};
    //     });
    // };

    // const handleMinAgeServed = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const minAge = {
    //         minAgeServed: parseInt(event.target.value, 10),
    //     };
    //     setPractitioner((prev: Practitioner) => {
    //         return { ...prev, ...minAge};
    //     });
    // };

    // const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const email = {
    //         email: event.target.value,
    //     };
    //     setPractitioner((prev: Practitioner) => {
    //         return { ...prev, ...email};
    //     });
    // };

    // const handleFullName = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const fullName = {
    //         fullName: event.target.value,
    //     };
    //     setPractitioner((prev: Practitioner) => {
    //         return { ...prev, ...fullName};
    //     });
    // };

    // const handleLanguagesList = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const languagesList = {
    //         languagesList: [event.target.value],
    //     };
    //     setPractitioner((prev: Practitioner) => {
    //         return { ...prev, ...languagesList};
    //     });
    // };

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
                //setPractitioner(defaultPractitioner);
            }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Practitioner</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to accept this practitioner?
                        {/* <VStack alignItems='flex-start'>
                            <HStack>
                                <Input value={practitioner.fullName} onChange={handleFullName} placeholder='Full Name' size='sm' />
                                <Input value={practitioner.email} onChange={handleEmail} placeholder='Email' size='sm' />
                            </HStack>
                            <HStack>
                                <Input value={practitioner.businessName} onChange={handleBusinessName} placeholder='Business Name' size='sm' width='60%'/>
                                <Input value={practitioner.phoneNumber} onChange={handlePhoneNumber} placeholder='Phone Number' size='sm' width='40%' />
                            </HStack>
                            <HStack>
                                <Input value={practitioner.businessLocation} onChange={handleBusinessLocation} placeholder='Business Location' size='sm' width='55%'/>
                                <Input value={practitioner.website} onChange={handleWebsite} placeholder='Website' size='sm' width='45%' />
                            </HStack>
                            <HStack>
                                <Input value={practitioner.modality} onChange={handleModality} placeholder='Therapy Modality' size='sm' width='70%'/>
                                <Input value={practitioner.minAgeServed} onChange={handleMinAgeServed} placeholder='Min Age' size='sm' width='30%' />
                            </HStack>
                            <HStack>
                                <Input value={practitioner.languagesList[0]} onChange={handleLanguagesList} placeholder='Language' size='sm' flexGrow='1' />
                            </HStack>
                        </VStack> */}
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            onAcceptClose();
                            //setPractitioner(defaultPractitioner);
                        }} variant='ghost' mr={2}>Cancel</Button>
                        <Button onClick={handleAcceptFormSubmission} colorScheme='teal'>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Button onClick={onDenyOpen} colorScheme='teal' size='sm'>Deny</Button>

            <Modal isOpen={isDenyOpen} onClose={() => {
                onDenyClose();
                //setPractitioner(defaultPractitioner);
            }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Deny New Practitioner</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to deny this practitioner?
                        {/* <VStack alignItems='flex-start'>
                            <HStack>
                                <Input value={practitioner.fullName} onChange={handleFullName} placeholder='Full Name' size='sm' />
                                <Input value={practitioner.email} onChange={handleEmail} placeholder='Email' size='sm' />
                            </HStack>
                            <HStack>
                                <Input value={practitioner.businessName} onChange={handleBusinessName} placeholder='Business Name' size='sm' width='60%'/>
                                <Input value={practitioner.phoneNumber} onChange={handlePhoneNumber} placeholder='Phone Number' size='sm' width='40%' />
                            </HStack>
                            <HStack>
                                <Input value={practitioner.businessLocation} onChange={handleBusinessLocation} placeholder='Business Location' size='sm' width='55%'/>
                                <Input value={practitioner.website} onChange={handleWebsite} placeholder='Website' size='sm' width='45%' />
                            </HStack>
                            <HStack>
                                <Input value={practitioner.modality} onChange={handleModality} placeholder='Therapy Modality' size='sm' width='70%'/>
                                <Input value={practitioner.minAgeServed} onChange={handleMinAgeServed} placeholder='Min Age' size='sm' width='30%' />
                            </HStack>
                            <HStack>
                                <Input value={practitioner.languagesList[0]} onChange={handleLanguagesList} placeholder='Language' size='sm' flexGrow='1' />
                            </HStack>
                        </VStack> */}
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            onDenyClose();
                            //setPractitioner(defaultPractitioner);
                        }} variant='ghost' mr={2}>Cancel</Button>
                        <Button onClick={handleDenyFormSubmission} colorScheme='teal'>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddPractitioner;