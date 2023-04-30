import React, { useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box, 
  HStack,
  Checkbox,
  CheckboxGroup,
  Heading,
} from '@chakra-ui/react';

import { SearchTherapistsQuery } from './actionsController';
import DistanceFilter from './components/DistanceFilter';

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
            <Box>
              <Heading size='sm' mb='2'>
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
        <DistanceFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default SearchTherapistsFilter;
