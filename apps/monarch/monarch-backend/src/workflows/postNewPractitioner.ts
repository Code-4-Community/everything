import { Practitioner } from "@c4c/monarch/common";
import { Request } from "express";

async function postNewPractitioner(req: Request, postPractitioner: (req: Request) => Promise<Practitioner>) {
    try {
        return postPractitioner(req);
    } catch (e) {
        console.log(e);
        throw new Error("Unable to post practitioner");
    }
}

export default postNewPractitioner;