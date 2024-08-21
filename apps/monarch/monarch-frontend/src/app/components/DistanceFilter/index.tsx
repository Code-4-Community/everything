import React, { useState, useEffect, useContext } from 'react';
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
import { CheckIcon } from '@chakra-ui/icons';
import { controller } from '../../actionsController';
import { QueryContext } from '../../SearchTherapists';
import { isValidZipcode } from '@c4c/monarch/common';

const defaultMaxDistance = 100;
const defaultZipcode = '';

const DistanceFilter: React.FC = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [toggleToolTip, setToggleToolTip] = useState(false);
  const [maxDistance, setMaxDistance] = useState<number>(defaultMaxDistance);
  const [zipcode, setZipcode] = useState<string>(defaultZipcode);

  const queryContext = useContext(QueryContext);

  useEffect(() => {
    if (toggleFilter && isValidZipcode(zipcode)) {
      queryContext?.setDistanceFilterEnabled(true);
      controller
        .extractGeocodeFromZipcode(zipcode)
        .then(queryContext?.setClientCoordinates);
    } else {
      queryContext?.setDistanceFilterEnabled(false);
      queryContext?.setClientCoordinates(undefined);
    }

    if (!toggleFilter) {
      setZipcode(defaultZipcode);
      setMaxDistance(defaultMaxDistance);
      queryContext?.setClientCoordinates(undefined);
      queryContext?.setSearchQuery({
        ...queryContext.searchQuery,
        maxDistance: defaultMaxDistance,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipcode, toggleFilter]);

  return (
    <Box>
      <FormControl display="flex" alignItems="center" mt="3" columnGap="1rem">
        <FormLabel htmlFor="enable-distance-filtering" mb="0" mr="0">
          <Heading size="sm">
            {`${toggleFilter ? 'Disable' : 'Enable'} Distance Filter`}
          </Heading>
        </FormLabel>
        <Switch
          id="enable-distance-filtering"
          colorScheme="teal"
          onChange={(e) => {
            setToggleFilter(e.target.checked);
            setMaxDistance(100);
          }}
        />
        {toggleFilter && (
          <InputGroup size="sm" width="auto">
            {isValidZipcode(zipcode) && (
              <InputRightElement
                pointerEvents="none"
                children={<CheckIcon color="teal" />}
              />
            )}
            <Input
              placeholder="Enter your zipcode"
              onChange={(e) => setZipcode(e.target.value)}
            />
          </InputGroup>
        )}
      </FormControl>
      {toggleFilter && isValidZipcode(zipcode) && (
        <Box mt="3">
          <Slider
            id="distance-slider"
            defaultValue={maxDistance}
            min={0}
            max={200}
            colorScheme="teal"
            onChange={(distance: number) => setMaxDistance(distance)}
            onMouseEnter={() => setToggleToolTip(true)}
            onMouseLeave={() => setToggleToolTip(false)}
            onChangeEnd={(distance: number) =>
              queryContext?.setSearchQuery({
                ...queryContext?.searchQuery,
                maxDistance: distance,
              })
            }
          >
            <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
              50 miles
            </SliderMark>
            <SliderMark value={100} mt="1" ml="-2.5" fontSize="sm">
              100 miles
            </SliderMark>
            <SliderMark value={150} mt="1" ml="-2.5" fontSize="sm">
              150 miles
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={toggleToolTip}
              label={`${maxDistance} miles`}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
        </Box>
      )}
    </Box>
  );
};

export default DistanceFilter;
