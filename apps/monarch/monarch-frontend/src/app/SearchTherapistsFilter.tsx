import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box, 
} from '@chakra-ui/react';
import LanguageFilter from './components/LanguageFilter';
import DistanceFilter from './components/DistanceFilter';
import AgeFilter from './components/AgeFilter';

const SearchTherapistsFilter: React.FC = () => {
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
          <LanguageFilter />
          <AgeFilter />
          <DistanceFilter />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default SearchTherapistsFilter;
