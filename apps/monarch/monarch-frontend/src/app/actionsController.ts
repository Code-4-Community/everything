import { Therapist, TherapistDisplayModel } from './therapist';
import { faker } from '@faker-js/faker';
import Fuse from 'fuse.js';
import { Practitioner, Key, createApiClient } from '@c4c/monarch/common';;
import corpImage from '../assets/Badge_Corp.png';
import longTimePartnerImage from '../assets/Badge_Heart.png';
import frequentPartner from '../assets/Badge_Partner.png';
import raw from './raw.json';
import { createApiClient } from '@c4c/monarch/common';
import { GeolocationPosition } from '@c4c/monarch/common';
import { dist } from './SearchTherapists';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

if (baseUrl == null) {
  throw new Error('Base URL is undefined, cannot communicate to the server.');
}

const serverApiClient = createApiClient(baseUrl);

faker.seed(123);

export interface ActionsController {
  searchTherapists: (
    query: SearchTherapistsQuery
  ) => Promise<TherapistDisplayModel[]>;
  getApplicants: (accessToken: string) => Promise<Practitioner[]>;
  extractGeocodeFromZipcode: (
    zipcode: string
  ) => Promise<GeolocationPosition>;
  fetchTherapist: (id: string) => Therapist;
  fetchApplicant: (id: string) => Therapist;
  postTherapist: (therapist: Practitioner, accessToken: string) => Promise<Practitioner>;
  deleteTherapist: (key: Key, accessToken: string) => Promise<Key>;
  deleteApplicant: (key: Key, accessToken: string) => Promise<Key>;
}

export interface SearchTherapistsQuery {
  searchString: string;
  languages: (string | number)[];
  maxDistance: number;
}

const LB_CORP_MONTHLY_DONOR: Badge = {
  name: 'Love Bus Corps Monthly Donor',
  imageUrl: corpImage,
};

const LONG_TIME_PARTNER: Badge = {
  name: 'Long Time Partner (5+ Years)',
  imageUrl: longTimePartnerImage,
};

const HOSPITAL_PARTNER: Badge = {
  name: 'Long Time Partner (5+ Years)',
};

const FREQUENT_PARTNER: Badge = {
  name: 'Frequent Partner (10+ Love Bus Children)',
  imageUrl: frequentPartner,
};

const MANDARIN: Badge = {
  name: 'Long Time Partner (5+ Years)',
};

const SPANISH: Badge = {
  name: 'Long Time Partner (5+ Years)',
};

const RYAN: Therapist = {
  fullName: 'Ryan Jung',
  address: '123 Huntington Ave, Boston, MA, 02115',
  city: '',
  state: '',
  zip: '',
  email: '',
  phone: '',
  profilePictureUrl:
    'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/Ryan_J.jpg',
  geocode: {
    lat: 42.339806,
    long: -71.089172,
    canonicalAddress: '123 Huntington Ave, Boston, MA, 02115',
  },
  minimumAgeServed: 17,
  description:
    "I'm a computer science major at Northeastern University graduating in 2023. I will be returning to work at Palantir full time as a Forward Deployed Engineer.\n\nOn the side, I'm Director of Engineering at Code4Community, a student organization that builds software for nonprofits in Boston. As Director of Engineering I'm in charge of overseeing all of our projects. Our most recent partner hopes to use our software to help over 75,000 youth in NYC in 2022. We're immensely proud to be able to harness the innovative potential of Northeastern students to help nonprofits achieve their goals.\n\nIn past years I was a technical lead for C4C working with Lucy's Love Bus (LLB): an organization dedicated to helping children with life threatening illnesses and their families. The software we created is helping families find all the amazing events offered to them by LLB and increases engagement across all of LLB's events.",
  therapyType: 'Software',
  title: 'Director of Engineering',
  badges: [],
  languages: [],
};

const SOMYA: Therapist = {
  fullName: 'Somya Prabhakar',
  address: '123 Huntington Ave, Boston, MA, 02115',
  city: '',
  state: '',
  zip: '',
  email: '',
  phone: '',
  profilePictureUrl:
    'https://c4cneu-public.s3.us-east-2.amazonaws.com/Board/2021/somya_prabhakar.jpg',
  geocode: {
    lat: 42.339806,
    long: -70.0989172,
    canonicalAddress: '456 Huntington Ave, Boston, MA, 02115',
  },
  minimumAgeServed: 17,
  description:
    "I'm an undergraduate student at Northeastern University, studying Computer Science and Business Administration with a concentration in Management. My experience includes full-stack development, customer experience, and teaching. I am pursuing a post-college career in software development. I'm an undergraduate student at Northeastern University, studying Computer Science and Business Administration with a concentration in Management. My experience includes full-stack development, customer experience, and teaching. I am pursuing a post-college career in software development.",
  therapyType: 'Software',
  title: 'Director of Operations',
  badges: [LONG_TIME_PARTNER, FREQUENT_PARTNER],
  languages: [],
};

const SOFIE: Therapist = {
  fullName: 'Sofie Duntugan',
  address: '123 Huntington Ave, Boston, MA, 02115',
  city: '',
  state: '',
  zip: '',
  email: '',
  phone: '',
  profilePictureUrl:
    'https://c4cneu-public.s3.us-east-2.amazonaws.com/profile-pictures/sofie_duntugan.jfif',
  geocode: {
    lat: 42.439806,
    long: -71.189172,
    canonicalAddress: '789 Huntington Ave, Boston, MA, 02115',
  },
  minimumAgeServed: 17,
  description:
    'As a second-year computer science and political science major at Northeastern University, I enjoy building technical solutions to pressing problems. In my roles as a developer, product manager, and technical lead, I strive to bring a contextual awareness of legal and ethical issues to every stage of product development. By building applications to expand the size and health of Boston’s urban forest at Code4Community and to support the conservation of endangered Hawaiian flora and fauna with the US Geological Survey, I’ve developed skills in web development and data visualization using React, TypeScript, Java, Vert.x, Python, and R.\nWhile I’m not coding, I enjoy researching a host of questions, whether that be why the digital divide persists, how policy decisions affect the delivery of human services, or why Zisha teapots are so expensive.',
  therapyType: 'Software',
  title: 'Director of Product',
  badges: [LB_CORP_MONTHLY_DONOR],
  languages: [],
};

const FAKE_THERAPISTS: Therapist[] = [...loaded]; // ...Array(1).fill(null).map(createRandomTherapist), RYAN, SOFIE, SOMYA]

function createRandomTherapist(): Therapist {
  const [lat, long] = faker.address.nearbyGPSCoordinate([42, -71], 100);
  // console.log([lat, long])
  return {
    fullName: faker.name.fullName(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: 'MA',
    zip: faker.address.zipCodeByState('MA'),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    profilePictureUrl: faker.image.people(300, 300, true),
    geocode: {
      lat: Number(lat),
      long: Number(long),
      canonicalAddress: 'XXX',
    },
    minimumAgeServed: 15,
    description: faker.lorem.paragraphs(3),
    therapyType: faker.name.jobArea(),
    title: faker.name.jobTitle(),
    badges: [],
    languages: [],
  };
}

async function extractGeocodeFromZipcode(zipcode: string): Promise<GeolocationPosition> {
  return await serverApiClient.getGeocode({ queries: { zipcode: zipcode }});
}

async function fetchAllPractitioners(useFake = false): Promise<Therapist[]> {
  const data = await serverApiClient.getPractitioners();
  // Transform on the frontend, but really ought to be done on the backend :/

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const therapists: Therapist[] = data.map((d) => ({
    fullName: d.fullName,
    address: d.businessLocation,
    city: '',
    state: '',
    zip: '',
    email: d.email,
    phone: d.phoneNumber,
    profilePictureUrl: '',
    minimumAgeServed: d.minAgeServed,
    description: '',
    therapyType: d.modality,
    title: d.businessName,
    website: d.website,
    badges: [],
    languages: d.languagesList,
    geocode: {
      lat: d.geocode.lat,
      long: d.geocode.long,
    },
  }));
  return therapists;
}

async function fetchPendingPractitioners(useFake = false, accessToken: string): Promise<Practitioner[]> {
  const data = await serverApiClient.getPendingPractitioners({
    headers: {
      "accessToken": accessToken
    },
  });
  // Transform on the frontend, but really ought to be done on the backend :/

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const therapists: Practitioner[] = data.map((d) => ({
    phoneNumber: d.phoneNumber,
    website: d.website,
    languages: d.languagesList[0],
    modality: d.modality,
    businessLocation: d.businessLocation,
    businessName: d.businessName,
    minAgeServed: d.minAgeServed,
    email: d.email,
    fullName: d.fullName,
    languagesList: d.languagesList,
    geocode: {
      lat: d.geocode.lat,
      long: d.geocode.long,
    },
  }));
  return therapists;
}

export function makeActionsController(): ActionsController {
  // Mutable in-memory store of therapists
  // [] represents that the store has not been initialized yet
  let allPractitioners: Therapist[] = [];

  return {
    searchTherapists: async (query: SearchTherapistsQuery) => {
      allPractitioners = await fetchAllPractitioners();

      let languageFilteredTherapists = allPractitioners.filter(
        (practitioner: Therapist) => {
          return practitioner.languages
            .map((language: string) => {
              return query.languages.includes(language);
            })
            .reduce((prev, cur) => {
              return prev || cur;
            });
        }
      );

      if (query.searchString.length === 0 && query.languages.length > 0)
        return languageFilteredTherapists;
      if (query.searchString.length === 0 && query.languages.length === 0)
        return allPractitioners;
      if (query.searchString.length > 0 && query.languages.length === 0)
        languageFilteredTherapists = allPractitioners;

      const searchIndex = new Fuse(languageFilteredTherapists, {
        keys: [
          'fullName',
          {
            name: 'description',
            weight: 1,
          },
          'therapyType',
          'title',
          {
            name: 'languages',
            weight: 2,
          },
        ],
        threshold: 0.6,
        useExtendedSearch: true,
        ignoreLocation: true,
        ignoreFieldNorm: true,
        includeScore: true,
      });
      const result = searchIndex.search(query.searchString);
      return result.map((r) => ({ ...r.item, searchScore: r.score ?? 0 }));
    },
    getApplicants: async (accessToken: string) => {
      const applicants = await fetchPendingPractitioners(false, accessToken);
      return applicants;
    },
    fetchTherapist: (id: string) => {
      return {} as Therapist;
    },
    fetchApplicant: (id: string) => {
      return {} as Therapist;
    },
    postTherapist: async (practitioner: Practitioner, accessToken: string): Promise<Practitioner> => {
      return await serverApiClient.postPractitioner(practitioner, {
        headers: {
          "accessToken": accessToken
        },
      });
    },
    deleteTherapist: async (key: Key, accessToken: string): Promise<Key> => {
      return await serverApiClient.deletePractitioner(key, {
        headers: {
          "accessToken": accessToken
        },
      });
    },
    deleteApplicant: async (key: Key, accessToken: string): Promise<Key> => {
      return await serverApiClient.deletePendingPractitioner(key, {
        headers: {
          "accessToken": accessToken
        },
      });
    }
    extractGeocodeFromZipcode: async (zipcode: string) => {
      return await extractGeocodeFromZipcode(zipcode);
    }
  };
}

export const controller = makeActionsController();
