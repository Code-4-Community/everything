import { 
    Box,
    Heading,
    HStack,
    Checkbox,
    CheckboxGroup,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { QueryContext } from '../../SearchTherapists';

const LanguageFilter: React.FC = () => {
    const queryContext = useContext(QueryContext);
    const availableLanguages = ['English', 'Spanish', 'Polish', 'Portuguese', 'Korean', 'French', 'ASL', 'Chinese', 'Haitian Creole', 'Russian', 'Vietnamese'];
    return (
        <Box mb='6'>
            <Heading size='sm' mb='2'>
            Languages
            </Heading>
            <HStack spacing={3}>
            <CheckboxGroup
                colorScheme="green"
                onChange={(selectedLanguages: (string | number)[]) => {
                queryContext?.setSearchQuery({
                    ...queryContext?.searchQuery,
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
    );
};

export default LanguageFilter;