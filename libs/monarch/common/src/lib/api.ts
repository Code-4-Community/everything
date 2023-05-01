import { makeApi } from "@zodios/core";
import { z } from "zod";
import { Practitioner } from './dto/Practitioner'
import { GeolocationPosition } from "./dto/GeolocationPosition";

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
