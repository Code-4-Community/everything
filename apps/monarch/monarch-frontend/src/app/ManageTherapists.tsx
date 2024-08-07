/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// @ts-ignore
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
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { controller } from './actionsController';
import { PractitionerInfo } from '@c4c/monarch/common';
Amplify.configure(awsmobile);

const ManageTherapists: React.FC<{ accessToken: string, reload: boolean, setReload: (arg: boolean) => void }> = ({accessToken, reload, setReload}) => {

  const [applicants, setApplicants] = useState<PractitionerInfo[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (accessToken.length > 0) {
        const data = await controller.getApplicants(accessToken);
        setApplicants(data);
      }
    }
    fetchData();
    setReload(false);
  }, [accessToken, reload, setReload]); 

  const { coords } = useGeolocated();

  return (
    <div>
      {applicants != null && (
          <VStack spacing={5}>
            {applicants.map((therapist) => (
              <Box
                w="full"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                paddingRight={5}
                paddingLeft={5}
                paddingTop={5}
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
                  </Wrap>
                  <div style={{ paddingTop: '15px'}}>
                      <AddPractitioner accessToken={accessToken} practitioner={therapist} setReload={setReload}/>
                  </div>
                </Box>
              </Box>
            ))}
          </VStack>
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
