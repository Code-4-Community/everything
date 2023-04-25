import React, { useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box,
  HStack,
  VStack,
  Checkbox,
  CheckboxGroup,
  Heading,
  Slider,
  SliderMark,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';

import { SearchTherapistsQuery } from './actionsController';

interface SearchTherapistsFilterProps {
  searchQuery: SearchTherapistsQuery;
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchTherapistsQuery>>;
  availableLanguages: string[];
}

const SearchTherapistsFilter: React.FC<SearchTherapistsFilterProps> = ({
  searchQuery,
  setSearchQuery,
  availableLanguages,
}) => {
  const [distance, setDistance] = useState(searchQuery.maxDistance);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Accordion allowToggle mt={2}>
      <AccordionItem borderTop={0}>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Advanced Filters
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack spacing={2} alignItems="flex-start">
            <Box>
              <Heading size="sm" mb={2}>
                Languages
              </Heading>
              <HStack spacing={3}>
                <CheckboxGroup
                  colorScheme="green"
                  onChange={(selectedLanguages: (string | number)[]) => {
                    setSearchQuery({
                      ...searchQuery,
                      languages: selectedLanguages,
                    });
                  }}
                >
                  {availableLanguages.map((language) => {
                    return <Checkbox value={language}>{language}</Checkbox>;
                  })}
                </CheckboxGroup>
              </HStack>
            </Box>
          </VStack>
          <Box>
            <Heading size="sm" mt={2} mb={2}>
              Maximum Distance
            </Heading>
            <Slider
              id="distance-slider"
              defaultValue={distance}
              min={0}
              max={200}
              colorScheme="teal"
              onChange={(distance: number) => setDistance(distance)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onChangeEnd={(distance: number) =>
                setSearchQuery({ ...searchQuery, maxDistance: distance })
              }
            >
              <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
                50 Miles
              </SliderMark>
              <SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
                100 Miles
              </SliderMark>
              <SliderMark value={150} mt="1" ml="-2.5" fontSize="sm">
                150 Miles
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg="teal.500"
                color="white"
                placement="top"
                isOpen={showTooltip}
                label={`${distance} miles`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default SearchTherapistsFilter;
