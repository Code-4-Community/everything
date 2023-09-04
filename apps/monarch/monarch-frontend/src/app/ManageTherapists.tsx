/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
//@ts-ignore
import awsmobile from '../aws-exports.js';
import AddPractitioner from './AddPractitioner';
import React, {
  useEffect,
  useState,
} from 'react';
import { useGeolocated } from 'react-geolocated';
import {
  Badge,
  Box,
  Divider,
  Heading,
  HStack,
  Link,
  Skeleton,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Practitioner } from '@c4c/monarch/common';
Amplify.configure(awsmobile);

const ManageTherapists: React.FC<{ accessToken: string }> = ({accessToken}) => {

  //const [accessToken, setAccessToken] = useState<string>('');
  const [applicants, setApplicants] = useState<Practitioner[]>([]);

  useEffect(() => {
    async function fetchData() {
    //   const userData = await Auth.currentAuthenticatedUser();
    //   const cognitoStorage = userData['pool']['storage'];
    //   const accessTokenKey = Object.keys(cognitoStorage).find((key) => key.includes('accessToken'));
    //   const accessTokenValue = accessTokenKey ? cognitoStorage[accessTokenKey] : '';
    //   setAccessToken(accessTokenValue);
      const RYAN: Practitioner = {
        phoneNumber: '1515551515',
        website: 'test.com',
        languages: '',
        modality: 'Software',
        businessLocation: '123 Huntington Ave, Boston, MA, 02115',
        businessName: 'Director of Engineering',
        minAgeServed: 17,
        email: 'test@test.com',
        fullName: 'Ryan Jung',
        languagesList: ['Spanish'],
        geocode: {
          lat: 42.339806,
          long: -71.089172,
        },
      };
      const RYAN2: Practitioner = {
        phoneNumber: '1515551515',
        website: 'test.com',
        languages: '',
        modality: 'Software',
        businessLocation: '123 Huntington Ave, Boston, MA, 02115',
        businessName: 'Director of Engineering',
        minAgeServed: 17,
        email: 'test@test.com',
        fullName: 'Ryan Jung 2',
        languagesList: ['Spanish'],
        geocode: {
          lat: 42.339806,
          long: -71.089172,
        },
      };
      const RYAN3: Practitioner = {
        phoneNumber: '1515551515',
        website: 'test.com',
        languages: '',
        modality: 'Software',
        businessLocation: '123 Huntington Ave, Boston, MA, 02115',
        businessName: 'Director of Engineering',
        minAgeServed: 17,
        email: 'test@test.com',
        fullName: 'Ryan Jung 3',
        languagesList: ['Spanish'],
        geocode: {
          lat: 42.339806,
          long: -71.089172,
        },
      };
      setApplicants([RYAN, RYAN2, RYAN3]);
    }
    fetchData();
  }, []); 

  const { coords } = useGeolocated();

  return (
    <div>
      {applicants != null && (
        // <InfiniteScroll
        //   dataLength={therapistsToRender.length} // This is important field to render the next data
        //   next={() => setNumTherapistsToRender(numTherapistsToRender + 10)}
        //   hasMore={therapistsToRender?.length < therapists.length}
        //   loader={
        //     <Stack>
        //       <Skeleton height="40px" />
        //       <Skeleton height="40px" />
        //       <Skeleton height="40px" />
        //     </Stack>
        //   }
        // >
          <VStack spacing={5}>
            {applicants.map((therapist) => (
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
                      removeApplication={() => {
                        applicants.filter((d) => d !== therapist);
                        console.log(applicants)}}/>
                    </WrapItem>
                  </Wrap>
                </Box>
              </Box>
            ))}
          </VStack>
        // </InfiniteScroll>
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

export default withAuthenticator(ManageTherapists);
