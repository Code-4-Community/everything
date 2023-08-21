import {
  Button,
  Card,
  ControlGroup,
  Elevation,
  Label,
  NumericInput,
  Spinner,
} from '@blueprintjs/core';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { controller, SearchTherapistsQuery } from './actionsController';
import { useGeolocated } from 'react-geolocated';
import { Therapist, TherapistDisplayModel } from './therapist';
import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Link,
  SimpleGrid,
  Skeleton,
  Stack,
  StackItem,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import {
  CheckCircleIcon,
  QuestionIcon,
  Search2Icon,
  StarIcon,
} from '@chakra-ui/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchTherapistsFilter from './SearchTherapistsFilter';

const debouncedSearchTherapists = debouncePromise(
  controller.searchTherapists,
  100
);

export const SearchTherapists: React.FC = () => {
  const { coords } = useGeolocated();
  const [searchQuery, setSearchQuery] = useState<SearchTherapistsQuery>({
    searchString: '',
    languages: [],
    maxDistance: 100,
  });

  const [searchResult, setSearchResult] = useState<
    TherapistDisplayModel[] | null
  >(null);

  useEffect(() => {
    setSearchResult(null);
    debouncedSearchTherapists(searchQuery).then(setSearchResult);
  }, [searchQuery]);

  const data = searchResult;
  const isLoading = searchResult == null;

  const onInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setNumTherapistsToRender(10);
      setSearchQuery({ ...searchQuery, searchString: evt.target.value });
    },
    [searchQuery, setSearchQuery]
  );

  const onMaxDistanceChange = useCallback(
    (value: number) => {
      setSearchQuery({ ...searchQuery, maxDistance: value });
    },
    [searchQuery, setSearchQuery]
  );

  function comparableDistance(therapist: Therapist): number {
    return therapist.geocode != null && coords != null
      ? dist(
          therapist.geocode?.lat,
          therapist.geocode?.long,
          coords?.latitude,
          coords?.longitude
        )
      : Number.POSITIVE_INFINITY;
  }
  console.log(process);
  console.log('data', data);
  const therapists = data?.filter((therapist) => {
    return (
      dist(
        therapist.geocode.lat,
        therapist.geocode.long,
        coords?.latitude,
        coords?.longitude
      ) < searchQuery.maxDistance
    );
  });

  // const therapists = data?.filter(
  //   (therapist) =>
  //     therapist.geocode == null ||
  //     coords == null ||
  //     (searchQuery.maxDistance ?? Number.MAX_VALUE) >=
  //       dist(
  //         therapist.geocode?.lat,
  //         therapist.geocode?.long,
  //         coords?.latitude,
  //         coords?.longitude
  //       )
  // )

  if (searchQuery.searchString.length === 0) {
    therapists?.sort((a, b) => comparableDistance(a) - comparableDistance(b));
  }

  const [numTherapistsToRender, setNumTherapistsToRender] = useState(10);

  const therapistsToRender = useMemo(
    () => therapists?.slice(0, numTherapistsToRender),
    [numTherapistsToRender, therapists]
  );

  return (
    <div>
      <div style={{ marginTop: 64 }}>
        <InputGroup size="lg">
          <InputLeftAddon children={<Search2Icon w={6} h={6} />} />
          <Input
            type="search"
            placeholder='Search practitioners by text (e.g. "Taekwondo", "Tracy", "Spanish")'
            onChange={onInputChange}
            value={searchQuery.searchString}
            autoFocus
          />
        </InputGroup>
        <SearchTherapistsFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          availableLanguages={[
            'English',
            'Spanish',
            'Polish',
            'Portuguese',
            'Korean',
            'French',
          ]}
        />

        <div style={{ marginBlock: 12 }}>
          <small>
            {therapists != null &&
              `Found ${therapists?.length} matching practitioners.`}
          </small>
        </div>
      </div>

      {therapists != null && therapistsToRender != null && (
        <InfiniteScroll
          dataLength={therapistsToRender.length} // This is important field to render the next data
          next={() => setNumTherapistsToRender(numTherapistsToRender + 10)}
          hasMore={therapistsToRender?.length < therapists.length}
          loader={
            <Stack>
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          }
        >
          <VStack spacing={5}>
            {therapistsToRender.map((therapist) => (
              <Box
                w="full"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                padding={5}
                gap={20}
              >
                <Box marginBottom={5}>
                  <Heading size="lg">{therapist.fullName}</Heading>

                  <Heading size="md">
                    {therapist.therapyType}, {therapist.title}
                  </Heading>
                  <HStack marginTop={3}>
                    {therapist.languages.map((language: string) => {
                      return (
                        <Badge borderRadius="full" px="2" colorScheme="orange">
                          {language}
                        </Badge>
                      );
                    })}
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      New
                    </Badge>
                    <Badge borderRadius="full" px="2" colorScheme="blue">
                      Frequent Partner (10+ Children)
                    </Badge>
                  </HStack>
                </Box>
                <Divider />
                <Box marginBlock={5}>
                  <Wrap spacingX={6} spacingY={3} align="center">
                    <WrapItem>
                      <Box>
                        <Box
                          color="gray.500"
                          fontWeight="bold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                        >
                          Location
                        </Box>
                        <Text>{therapist.address}</Text>
                      </Box>
                    </WrapItem>

                    <WrapItem>
                      <Box>
                        <Box
                          color="gray.500"
                          fontWeight="bold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                        >
                          Email
                        </Box>
                        <Text>{therapist.email}</Text>
                      </Box>
                    </WrapItem>
                    {therapist.website && (
                      <WrapItem>
                        <Box>
                          <Box
                            color="gray.500"
                            fontWeight="bold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                          >
                            Website
                          </Box>
                          <Text>
                            <Link href={therapist.website} color="blue.600">
                              {therapist.website}
                            </Link>
                          </Text>
                        </Box>
                      </WrapItem>
                    )}
                    <WrapItem>
                      <Box>
                        <Box
                          color="gray.500"
                          fontWeight="bold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                        >
                          Phone
                        </Box>
                        <Text>{therapist.phone}</Text>
                      </Box>
                    </WrapItem>
                    <WrapItem>
                      <Box>
                        <Box
                          color="gray.500"
                          fontWeight="bold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                        >
                          Estimated Distance
                        </Box>
                        <Text>
                          {therapist.geocode != null && coords != null
                            ? dist(
                                therapist.geocode?.lat,
                                therapist.geocode?.long,
                                coords?.latitude,
                                coords?.longitude
                              ).toFixed(2) + ' miles away'
                            : 'Unknown'}
                        </Text>
                      </Box>
                    </WrapItem>
                  </Wrap>
                </Box>
                {therapist.searchScore != null && (
                  <Box gap={1} alignItems="end" display="flex" dir="row">
                    {1.0 - therapist.searchScore >= 0.9 ? (
                      <CheckCircleIcon w={5} h={5} color="green.400" />
                    ) : (
                      <QuestionIcon w={5} h={5} color="orange.300" />
                    )}

                    <Text size="sm">
                      {(100 * (1.0 - therapist.searchScore)).toFixed(2)}% match
                    </Text>
                  </Box>
                )}
              </Box>
            ))}
          </VStack>
        </InfiniteScroll>
      )}

      {isLoading && (
        <Stack spacing={5} marginTop="48px">
          <Skeleton height="240px" />
          <Skeleton height="240px" />
          <Skeleton height="240px" />
        </Stack>
      )}
    </div>
  );
};

export function dist(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  const miles = d / 1609;
  return miles;
}

/**
     *
       https://stackoverflow.com/questions/35228052/debounce-function-implemented-with-promises
     * @param f callback
     * @param wait milliseconds
     * @param abortValue if has abortValue, promise will reject it if
     * @returns Promise
     */
export function debouncePromise<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  abortValue: any = undefined
) {
  let cancel = () => {
    return; // no-op
  };
  // type Awaited<T> = T extends PromiseLike<infer U> ? U : T
  type ReturnT = Awaited<ReturnType<T>>;
  const wrapFunc = async (...args: Parameters<T>): Promise<ReturnT> => {
    cancel();
    return await new Promise((resolve, reject) => {
      const timer = setTimeout(() => resolve(fn(...args)), wait);
      cancel = () => {
        clearTimeout(timer);
        if (abortValue !== undefined) {
          reject(abortValue);
        }
      };
    });
  };
  return wrapFunc;
}
