import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Switch,
    Heading,
    InputGroup,
    InputRightElement,
    Input,
    Slider,
    SliderMark,
    SliderTrack,
    SliderThumb,
    SliderFilledTrack,
    Tooltip,
} from '@chakra-ui/react';
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { SearchTherapistsQuery } from '../../actionsController';

interface DistanceFilterProps {
    searchQuery: SearchTherapistsQuery;
    setSearchQuery:React.Dispatch<React.SetStateAction<SearchTherapistsQuery>>;
}

const isValidZipcode = (zipcode: string): boolean => {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);
};

const DistanceFilter: React.FC<DistanceFilterProps> = ({ searchQuery, setSearchQuery }) => {
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleToolTip, setToggleToolTip] = useState(false);
    const [maxDistance, setMaxDistance] = useState<number>(100);
    const [zipcode, setZipcode] = useState<string>("");
 
    return (
        <Box>
            <FormControl display='flex' alignItems='center' mt='3' columnGap='1rem'>
                <FormLabel htmlFor='enable-distance-filtering' mb='0' mr='0'>
                    <Heading size='sm'>Enable Distance Filtering?</Heading>
                </FormLabel>
                <Switch id='enable-distance-filtering' colorScheme='teal' onChange={(e) => {
                    setToggleFilter(e.target.checked);
                    setMaxDistance(100);
                }}/>
                {
                    toggleFilter && (
                        <InputGroup size='sm' width='auto'>
                            
                            <InputRightElement pointerEvents='none' children={
                                isValidZipcode(zipcode) ? 
                                <CheckIcon color='teal' /> :
                                <SmallCloseIcon color='red' />
                            }/>
                            <Input placeholder="Enter your zipcode" onChange={(e) => setZipcode(e.target.value)}/>
                        </InputGroup>
                    )
                }
            </FormControl>
            {
                    toggleFilter && isValidZipcode(zipcode) && (
                        <Box mt='3'>
                            <Slider id='distance-slider' defaultValue={100} min={0} max={200} colorScheme='teal'
                                    onChange={(distance: number) => setMaxDistance(distance)}
                                    onMouseEnter={() => setToggleToolTip(true)}
                                    onMouseLeave={() => setToggleToolTip(false)}
                                    onChangeEnd={(distance: number) => setSearchQuery({ ...searchQuery, maxDistance: distance })}>
                                        <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>50 miles</SliderMark>
                                        <SliderMark value={100} mt='1' ml='-2.5' fontSize='sm'>100 miles</SliderMark>
                                        <SliderMark value={150} mt='1' ml='-2.5' fontSize='sm'>150 miles</SliderMark>
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <Tooltip hasArrow bg='teal.500' color='white' placement='top' 
                                                isOpen={toggleToolTip} label={`${maxDistance} miles`}>
                                                    <SliderThumb />
                                        </Tooltip>
                            </Slider>
                        </Box>
                    )
                }
        </Box>
    );
};

export default DistanceFilter;