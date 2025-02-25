import { useContext, useState } from 'react';
import { QueryContext } from '../../SearchTherapists';
import {
  Box,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';

const AGE_MARKS = [2, 6, 10, 14, 18]

const AgeFilter: React.FC = () => {
  const queryContext = useContext(QueryContext);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [minAge, setMinAge] = useState<number>(queryContext?.searchQuery.minAge || 18);

  return (
    <Box mb='6'>
      <Heading size="sm" mb="2">
        Ages Accepted
      </Heading>
      <Slider
        id='age-slider'
        defaultValue={18}
        min={0}
        max={18}
        isReversed
        colorScheme='teal'
        onChange={(minAge: number) => setMinAge(minAge)}
        onChangeEnd={(minAge: number) => 
          queryContext?.setSearchQuery({
            ...queryContext?.searchQuery, 
            minAge,
          }
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        maxW={600}
      >
        {AGE_MARKS.map((mark: number) => (
          <SliderMark key={mark} value={mark} mt="1" ml="-2.5" fontSize="sm">
            {mark}+ years
          </SliderMark>
        ))}
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`${minAge}+ years`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Box>
  );
};

export default AgeFilter;
