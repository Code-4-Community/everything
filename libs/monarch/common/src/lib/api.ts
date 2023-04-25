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
  }
]);
