import { Therapist, TherapistDisplayModel } from './therapist';
import { faker } from '@faker-js/faker';
import Fuse from 'fuse.js';
import { Practitioner, Key, createApiClient } from '@c4c/monarch/common';;

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
  fetchTherapist: (id: string) => Therapist;
  fetchApplicant: (id: string) => Therapist;
  postTherapist: (therapist: Practitioner, accessToken: string) => Promise<Practitioner>;
  deleteTherapist: (key: Key, accessToken: string) => Promise<Key>;
}

export interface SearchTherapistsQuery {
  searchString: string;
  languages: (string | number)[];
  maxDistance: number;
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
    languages: d.languagesList,
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
    }
  };
}

export const controller = makeActionsController();
