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
import { Practitioner, GeolocationPosition } from '@c4c/monarch/common';
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
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { CheckCircleIcon, QuestionIcon, Search2Icon } from '@chakra-ui/icons';
import CreatableSelect from 'react-select/creatable';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchTherapistsFilter from './SearchTherapistsFilter';
//@ts-ignore
import awsmobile from '../aws-exports.js';
import { Amplify } from 'aws-amplify';
Amplify.configure(awsmobile);

interface QueryContext {
  searchQuery: SearchTherapistsQuery;
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchTherapistsQuery>>;
  setClientCoordinates: React.Dispatch<
    React.SetStateAction<GeolocationPosition | undefined>
  >;
  setDistanceFilterEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const QueryContext = createContext<QueryContext | undefined>(undefined);

const debouncedSearchTherapists = debouncePromise(
  controller.searchTherapists,
  100
);

const renderBadges = (therapist: TherapistDisplayModel) => {
  const badgeList = [
    ...therapist.languages.map((language) => ({
      label: language,
      colorScheme: 'orange',
    })),
  ];

  const now = new Date();
  const joinedDate = new Date(therapist.dateJoined);
  const monthsDiff =
    (now.getFullYear() - joinedDate.getFullYear()) * 12 +
    now.getMonth() -
    joinedDate.getMonth();

  if (monthsDiff < 12) {
    badgeList.push({ label: 'New', colorScheme: 'teal' });
  } else {
    const yearsDiff = Math.floor(monthsDiff / 12);
    if (yearsDiff > 0) {
      badgeList.push({
        label: `${yearsDiff} Year${yearsDiff !== 1 ? 's' : ''}`,
        colorScheme: 'purple',
      });
    }
  }

  if (therapist.familiesHelped >= 10) {
    badgeList.push({
      label: 'Frequent Partner (10+ Children)',
      colorScheme: 'blue',
    });
  } else if (therapist.familiesHelped >= 5) {
    badgeList.push({
      label: 'Long Time Partner (5+ Children)',
      colorScheme: 'green',
    });
  }

  return badgeList.map((badge, index) => (
    <Badge
      key={index}
      borderRadius="full"
      px="2"
      colorScheme={badge.colorScheme}
    >
      {badge.label}
    </Badge>
  ));
};

const DeleteButton: React.FC<{
  therapist: TherapistDisplayModel;
  accessToken: string;
  setReload?: (arg: boolean) => void;
}> = ({ therapist, accessToken, setReload }) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const key = { uuid: therapist.uuid };

  return (
    <>
      <Button onClick={onDeleteOpen} colorScheme="red" size="sm">
        Remove
      </Button>

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => {
          onDeleteClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove Practitioner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to remove this practitioner?
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onDeleteClose();
              }}
              variant="ghost"
              mr={2}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onDeleteClose();
                controller.deleteTherapist(key, accessToken);
                if (setReload) {
                  setReload(true);
                }
              }}
              colorScheme="teal"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const EditButton: React.FC<{
  therapist: TherapistDisplayModel;
  accessToken: string;
  setReload?: (arg: boolean) => void;
}> = ({ therapist, accessToken, setReload }) => {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [phone, setPhone] = useState<string>(therapist.phone);
  const [fullName, setFullName] = useState<string>(therapist.fullName);
  const [address, setAddress] = useState<string>(therapist.address);
  const [email, setEmail] = useState<string>(therapist.email);
  const [website, setWebsite] = useState<string | undefined>(therapist.website);
  const [familiesHelped, setFamiliesHelped] = useState<number>(
    therapist.familiesHelped
  );
  const [dateJoined, setDateJoined] = useState<string>(therapist.dateJoined);
  const [therapyType, setTherapyType] = useState<string>(therapist.therapyType);
  const [businessName, setBusinessName] = useState<string>(therapist.title);
  const [languages, setLanguages] = useState<
    readonly { value: string; label: string }[]
  >(therapist.languages.map((lang) => ({ value: lang, label: lang })));

  const handleLanguageChange = (
    newValue: readonly { value: string; label: string }[]
  ) => {
    setLanguages(newValue);
  };

  const isFormValid = () => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    return (
      phone.trim() !== '' &&
      fullName.trim() !== '' &&
      address.trim() !== '' &&
      email.trim() !== '' &&
      dateFormat.test(dateJoined) &&
      languages.length > 0
    );
  };

  const resetForm = () => {
    setPhone(therapist.phone);
    setFullName(therapist.fullName);
    setAddress(therapist.address);
    setEmail(therapist.email);
    setWebsite(therapist.website);
    setFamiliesHelped(therapist.familiesHelped);
    setDateJoined(therapist.dateJoined);
    setTherapyType(therapist.therapyType);
    setBusinessName(therapist.title);
    setLanguages(
      therapist.languages.map((lang) => ({ value: lang, label: lang }))
    );
  };

  const handleClose = () => {
    resetForm();
    onEditClose();
  };

  const handleSave = () => {
    if (isFormValid()) {
      const updatedInfo: Practitioner = {
        uuid: therapist.uuid,
        phoneNumber: phone,
        website: website || '',
        modality: therapyType,
        businessLocation: address,
        businessName: businessName,
        minAgeServed: therapist.minimumAgeServed,
        email: email,
        fullName: fullName,
        languagesList: languages.map((lang) => lang.value),
        geocode: therapist.geocode,
        dateJoined: dateJoined,
        familiesHelped: familiesHelped,
      };
      controller.updateTherapist(updatedInfo, accessToken).then(() => {
        if (setReload) {
          setReload(true);
        }
      });

      onEditClose();
    }
  };

  return (
    <>
      <Button onClick={onEditOpen} colorScheme="teal" size="sm">
        Edit
      </Button>

      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Practitioner Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Therapy Type</FormLabel>
                <Input
                  value={therapyType}
                  onChange={(e) => setTherapyType(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Business Name</FormLabel>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Languages</FormLabel>
                <CreatableSelect
                  isMulti
                  value={languages}
                  onChange={handleLanguageChange}
                  placeholder="Type and press enter to add languages"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Date Joined</FormLabel>
                <Input
                  type="date"
                  value={dateJoined}
                  onChange={(e) => setDateJoined(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Families Helped</FormLabel>
                <NumberInput
                  value={familiesHelped}
                  onChange={(valueString, valueNumber) =>
                    setFamiliesHelped(valueNumber)
                  }
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Website</FormLabel>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={handleSave}
              isDisabled={!isFormValid()}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const SearchTherapists: React.FC<{
  accessToken: string;
  reload?: boolean;
  setReload?: (arg: boolean) => void;
}> = ({ accessToken, reload, setReload }) => {
  const { coords } = useGeolocated();
  const [distanceFilterEnabled, setDistanceFilterEnabled] = useState(false);
  const [clientCoordinates, setClientCoordinates] =
    useState<GeolocationPosition>();
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
    // return 1;
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
    // return true;
    return (
      !distanceFilterEnabled ||
      clientCoordinates === undefined ||
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
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('CognitoIdentityServiceProvider')) {
        localStorage.removeItem(key);
      }
    });
    navigate('/');
  };

  const parentStyles = {
    display: 'flex',
  };

  const regularStyles = {
    paddingTop: '20px',
    paddingRight: '30px',
  };

  const adminStyles = {
    paddingRight: '30px',
  };

  return (
    <span style={parentStyles}>
      <div style={{ flex: 1 }}>
        <div style={{ marginTop: 10 }}>
          <HStack>
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
            {location.pathname !== '/admin' && (
              <div>
                <Button colorScheme="teal" onClick={handleLogin}>
                  Login
                </Button>
              </div>
            )}
            {location.pathname === '/admin' && (
              <div>
                <Button colorScheme="teal" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </HStack>

          <QueryContext.Provider
            value={{
              searchQuery: searchQuery,
              setSearchQuery: setSearchQuery,
              setClientCoordinates: setClientCoordinates,
              setDistanceFilterEnabled: setDistanceFilterEnabled,
            }}
          >
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
                    <HStack marginTop={3}>{renderBadges(therapist)}</HStack>
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
                            {therapist.geocode != null &&
                            clientCoordinates != null
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
                        <Box
                          width="150px"
                          display="flex"
                          dir="row"
                          justifyContent="space-between"
                        >
                          <DeleteButton
                            therapist={therapist}
                            accessToken={accessToken}
                            setReload={setReload}
                          />
                          <EditButton
                            key={therapist.uuid}
                            therapist={therapist}
                            accessToken={accessToken}
                            setReload={setReload}
                          ></EditButton>
                        </Box>
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
                        {(100 * (1.0 - therapist.searchScore)).toFixed(2)}%
                        match
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
