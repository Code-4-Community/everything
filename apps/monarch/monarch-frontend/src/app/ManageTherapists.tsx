import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsmobile from '../aws-exports.js';
import AddPractitioner from './AddPractitioner';
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
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import {
  CheckCircleIcon,
  QuestionIcon,
  Search2Icon,
} from '@chakra-ui/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchTherapistsFilter from './SearchTherapistsFilter';
import { Practitioner } from '@c4c/monarch/common';

const debouncedSearchTherapists = debouncePromise(
  controller.searchTherapists,
  100
);



Amplify.configure(awsmobile);

function ManageTherapists() {
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      const userData = await Auth.currentAuthenticatedUser();
      const cognitoStorage = userData['pool']['storage'];
      const accessTokenKey = Object.keys(cognitoStorage).find((key) => key.includes('accessToken'));
      const accessTokenValue = accessTokenKey ? cognitoStorage[accessTokenKey] : '';
      //console.log(accessTokenValue);
      setAccessToken(accessTokenValue);
    }
    fetchData();
  }, []); 
  
  // return (
  // <div>
  //   <AddPractitioner accessToken={accessToken}/>
  //   <div></div>
  //   <button onClick={() => axios.get('http://localhost:3333/admin', { headers: { 'accesstoken': accessToken}}).then(res=> console.log(res))}>Test</button>
  // </div>);

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


  // const RYAN: Practitioner = {
  //   fullName: 'Ryan Jung',
  //   businessLocation: '123 Huntington Ave, Boston, MA, 02115',
  //   email: '',
  //   phoneNumber: '1515551515',
  //   profilePictureUrl:
  //     'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/Ryan_J.jpg',
  //   geocode: {
  //     lat: 42.339806,
  //     long: -71.089172,
  //   },
  //   minimumAgeServed: 17,
  //   description:
  //     "I'm a computer science major at Northeastern University graduating in 2023. I will be returning to work at Palantir full time as a Forward Deployed Engineer.\n\nOn the side, I'm Director of Engineering at Code4Community, a student organization that builds software for nonprofits in Boston. As Director of Engineering I'm in charge of overseeing all of our projects. Our most recent partner hopes to use our software to help over 75,000 youth in NYC in 2022. We're immensely proud to be able to harness the innovative potential of Northeastern students to help nonprofits achieve their goals.\n\nIn past years I was a technical lead for C4C working with Lucy's Love Bus (LLB): an organization dedicated to helping children with life threatening illnesses and their families. The software we created is helping families find all the amazing events offered to them by LLB and increases engagement across all of LLB's events.",
  //   therapyType: 'Software',
  //   title: 'Director of Engineering',
  //   badges: [],
  //   languages: 'Spanish',
  // };

  const RYAN: Practitioner = {
    phoneNumber: '1515551515',
    website: '',
    languages: '',
    modality: 'Software',
    businessLocation: '123 Huntington Ave, Boston, MA, 02115',
    businessName: 'Director of Engineering',
    minAgeServed: 17,
    email: '',
    fullName: 'Ryan Jung',
    languagesList: ['Spanish'],
    geocode: {
      lat: 42.339806,
      long: -71.089172,
    },
};
  
  // const SOMYA: Therapist = {
  //   fullName: 'Somya Prabhakar',
  //   address: '123 Huntington Ave, Boston, MA, 02115',
  //   city: '',
  //   state: '',
  //   zip: '',
  //   email: '',
  //   phoneNumber: '1515551515',
  //   profilePictureUrl:
  //     'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2021/somya_prabhakar.jpg',
  //   geocode: {
  //     lat: 42.339806,
  //     long: -70.0989172,
  //   },
  //   minimumAgeServed: 17,
  //   description:
  //     "I'm an undergraduate student at Northeastern University, studying Computer Science and Business Administration with a concentration in Management. My experience includes full-stack development, customer experience, and teaching. I am pursuing a post-college career in software development. I'm an undergraduate student at Northeastern University, studying Computer Science and Business Administration with a concentration in Management. My experience includes full-stack development, customer experience, and teaching. I am pursuing a post-college career in software development.",
  //   therapyType: 'Software',
  //   title: 'Director of Operations',
  //   badges: [],
  //   languages: [],
  // };
  
  // const SOFIE: Therapist = {
  //   fullName: 'Sofie Duntugan',
  //   address: '123 Huntington Ave, Boston, MA, 02115',
  //   city: '',
  //   state: '',
  //   zip: '',
  //   email: '',
  //   phoneNumber: '1515551515',
  //   profilePictureUrl:
  //     'https://c4cneu-public.s3.us-east-2.amazonaws.com/profile-pictures/sofie_duntugan.jfif',
  //   geocode: {
  //     lat: 42.439806,
  //     long: -71.189172,
  //   },
  //   minimumAgeServed: 17,
  //   description:
  //     'As a second-year computer science and political science major at Northeastern University, I enjoy building technical solutions to pressing problems. In my roles as a developer, product manager, and technical lead, I strive to bring a contextual awareness of legal and ethical issues to every stage of product development. By building applications to expand the size and health of Boston’s urban forest at Code4Community and to support the conservation of endangered Hawaiian flora and fauna with the US Geological Survey, I’ve developed skills in web development and data visualization using React, TypeScript, Java, Vert.x, Python, and R.\nWhile I’m not coding, I enjoy researching a host of questions, whether that be why the digital divide persists, how policy decisions affect the delivery of human services, or why Zisha teapots are so expensive.',
  //   therapyType: 'Software',
  //   title: 'Director of Product',
  //   badges: [],
  //   languages: [],
  // };
  
  const FAKE_THERAPISTS: Practitioner[] = []; // ...Array(1).fill(null).map(createRandomTherapist), RYAN, SOFIE, SOMYA]
  FAKE_THERAPISTS.push(RYAN);

  const data = FAKE_THERAPISTS;
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

  //console.log('data', data);
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
                    {therapist.modality}, {therapist.businessName}
                  </Heading>
                  <HStack marginTop={3}>
                    {therapist.languagesList.map((language: string) => {
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
                        <Text>{therapist.businessLocation}</Text>
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
                        <Text>{therapist.phoneNumber}</Text>
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
                    <WrapItem>
                      <AddPractitioner accessToken={accessToken} practitioner={therapist} 
                      removeApplication={() => {data.filter((d) => d !== therapist)}}/>
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
}

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

export default withAuthenticator(ManageTherapists);
