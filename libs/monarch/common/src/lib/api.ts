import { makeApi } from "@zodios/core";
import { z } from "zod";
import { Practitioner, PractitionerInfo } from './dto/Practitioner'
import { Key } from "./dto/Key";import { GeolocationPosition } from "./dto/GeolocationPosition";

export const userApi = makeApi([
  {
    method: "get",
    path: "/",
    alias: "",
    description: "Home Page",
    response: z.object({ ok: z.number() }),
  },
  {
    method: "get",
    path: "/practitioners",
    alias: "getPractitioners",
    description: "Get Practitioners",
    response: z.array(Practitioner),
  },
  {
    method: "get",
    path: "/pendingPractitioners",
    alias: "getPendingPractitioners",
    description: "Get Pending Practitioners",
    response: z.array(PractitionerInfo),
    parameters: [
      {
        name: 'accessToken',
        description: 'Admin Access Token',
        schema: z.string(),
        type: 'Header',
      }
    ]
  },
  {
    method: "post",
    path: "/practitioners",
    alias: "postPractitioner",
    description: "Post Practitioner",
    response: Practitioner,
    parameters: [
      {
        name: 'practitioner',
        description: 'New Practitioner',
        schema: PractitionerInfo,
        type: 'Body',
      },
      {
        name: 'accessToken',
        description: 'Admin Access Token',
        schema: z.string(),
        type: 'Header',
      }
    ]
  },
  {
    method: "delete",
    path: "/practitioners",
    alias: "deletePractitioner",
    description: "Delete Practitioner",
    response: Key,
    parameters: [
      {
        name: 'Key',
        description: 'Partition key and sort key',
        schema: Key,
        type: 'Body',
      },
      {
        name: 'accessToken',
        description: 'Admin Access Token',
        schema: z.string(),
        type: 'Header',
      }
    ]
  },
  {
    method: "delete",
    path: "/pendingPractitioners",
    alias: "deletePendingPractitioner",
    description: "Delete Pending Practitioner",
    response: Key,
    parameters: [
      {
        name: 'Key',
        description: 'Partition key and sort key',
        schema: Key,
        type: 'Body',
      },
      {
        name: 'accessToken',
        description: 'Admin Access Token',
        schema: z.string(),
        type: 'Header',
      }
    ]
  },
  {
   method: "get",
   path: "/geocode",
   alias: "getGeocode",
   description: "Get Geocode",
   response: GeolocationPosition,
   parameters: [
    {
      name: "zipcode",
      description: "Zipcode Query",
      schema: z.string(),
      type: "Query",
    },
   ]
  },
]);
