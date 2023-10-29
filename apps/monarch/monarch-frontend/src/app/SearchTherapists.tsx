/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { controller, SearchTherapistsQuery } from './actionsController';
import { GeolocationPosition } from '@c4c/monarch/common';
import { useGeolocated } from 'react-geolocated';
import { Therapist, TherapistDisplayModel } from './therapist';
import {
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import {
  CheckCircleIcon,
  QuestionIcon,
  Search2Icon,
} from '@chakra-ui/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchTherapistsFilter from './SearchTherapistsFilter';
//@ts-ignore
import awsmobile from '../aws-exports.js';
import { Amplify } from 'aws-amplify';
Amplify.configure(awsmobile);

interface QueryContext {
  searchQuery: SearchTherapistsQuery;
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchTherapistsQuery>>;
  setClientCoordinates: React.Dispatch<React.SetStateAction<GeolocationPosition | undefined>>;
  setDistanceFilterEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QueryContext = createContext<QueryContext | undefined>(undefined);

const debouncedSearchTherapists = debouncePromise(
  controller.searchTherapists,
  100
);

const DeleteButton: React.FC<{ therapist: TherapistDisplayModel, accessToken: string, setReload?: (arg: boolean) => void }> = ({ therapist, accessToken, setReload }) => {
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const key = {phoneNumber: therapist.phone, fullName: therapist.fullName};

  return (
    <>
      <Button onClick={onDeleteOpen} colorScheme='red' size='sm'>Remove</Button>

      <Modal isOpen={isDeleteOpen} onClose={() => {
          onDeleteClose();
      }}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>Remove Practitioner</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  Are you sure you want to remove this practitioner?                    
              </ModalBody>
              <ModalFooter>
                  <Button onClick={() => {
                      onDeleteClose();
                  }} variant='ghost' mr={2}>Cancel</Button>
                  <Button onClick={() => {
                      onDeleteClose();
                      controller.deleteTherapist(key, accessToken);
                      if (setReload) {
                        setReload(true);
                      }
                  }} colorScheme='teal'>Submit</Button>
              </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  );
}

export const SearchTherapists: React.FC<{ accessToken: string, reload?: boolean, setReload?: (arg: boolean) => void }> = ({accessToken, reload, setReload}) => {
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
    if (setReload) {
      setReload(false);
    }
    console.log('here');
  }, [searchQuery, reload, setReload]);

  const data = searchResult;
  const isLoading = searchResult == null;

  const onInputChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setNumTherapistsToRender(50);
      setSearchQuery({ ...searchQuery, searchString: evt.target.value });
    },
    [searchQuery, setSearchQuery]
  );

  function comparableDistance(therapist: Therapist): number {
    return therapist.geocode != null && clientCoordinates != null
      ? dist(
          therapist.geocode?.lat,
          therapist.geocode?.long,
          clientCoordinates?.latitude,
          clientCoordinates?.longitude
        )
      : Number.POSITIVE_INFINITY;
  }

  const therapists = data?.filter((therapist) => {
    return (
      !distanceFilterEnabled || clientCoordinates === undefined ||
      dist(
        therapist.geocode.lat,
        therapist.geocode.long,
        clientCoordinates.latitude,
        clientCoordinates.longitude
      ) < searchQuery.maxDistance
    );
  });
  
  if (searchQuery.searchString.length === 0) {
    therapists?.sort((a, b) => comparableDistance(a) - comparableDistance(b));
  }

  const [numTherapistsToRender, setNumTherapistsToRender] = useState(10);

  const therapistsToRender = useMemo(
    () => therapists?.slice(0, numTherapistsToRender),
    [numTherapistsToRender, therapists]
  );

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/admin');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const parentStyles = {
    display: 'flex'
  };

  const regularStyles = {
    paddingTop: '20px',
    paddingRight: '30px'
  }

  const adminStyles = {
    paddingRight: '30px'
  }

  return (
    <span style={parentStyles}>   
      {location.pathname !== '/admin' && (
        <div style={regularStyles}>       
          <Button colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>
        </div> 
      )}
      {location.pathname === '/admin' && (
        <div style={adminStyles}>       
          <Button colorScheme="teal" onClick={handleLogout}>
            Logout
          </Button>
        </div> 
      )}

    <div style={{flex: 1}}>

      <div style={{ marginTop: 10 }}>
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
        
        <QueryContext.Provider value={{
          searchQuery: searchQuery,
          setSearchQuery: setSearchQuery,
          setClientCoordinates: setClientCoordinates,
          setDistanceFilterEnabled: setDistanceFilterEnabled,
        }}>
          <SearchTherapistsFilter />
        </QueryContext.Provider>
      
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
                paddingRight={5}
                paddingLeft={5}
                paddingTop={5}
                paddingBottom={therapist.searchScore ? 5 : 0}
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
                          {therapist.geocode != null && clientCoordinates != null
                            ? dist(
                                therapist.geocode?.lat,
                                therapist.geocode?.long,
                                clientCoordinates?.latitude,
                                clientCoordinates?.longitude
                              ).toFixed(2) + ' miles away'
                            : 'Unknown'}
                        </Text>
                      </Box>
                    </WrapItem>
                  </Wrap>
                  <div style={{ paddingTop: '10px' }}>
                    {accessToken.length > 0 && (
                      <DeleteButton therapist={therapist} accessToken={accessToken} setReload={setReload} />
                    )}
                  </div>
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
          <Skeleton height="240px"/>
          <Skeleton height="240px" />
          <Skeleton height="240px" />
        </Stack>
      )}
    </div>
    </span>
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debouncePromise<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
