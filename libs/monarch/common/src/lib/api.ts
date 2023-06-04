import { makeApi } from "@zodios/core";
import { z } from "zod";
import { Practitioner } from './dto/Practitioner'


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
    method: "post",
    path: "/practitioners",
    alias: "postPractitioner",
    description: "Post Practitioner",
    response: Practitioner,
    parameters: [
      {
        name: 'practitioner',
        description: 'New Practitioner',
        schema: Practitioner,
        type: 'Body',
      }
    ]
  }
]);
