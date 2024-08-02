import { Practitioner } from "@c4c/monarch/common";
import { Request } from "express";

async function updatePractitionerWF(req: Request, updatePractitioner: (req: Request) => Promise<Practitioner>) {
    try {
        return updatePractitioner(req);
    } catch (e) {
        console.log(e);
        throw new Error("Unable to update practitioner");
    }
}

export default updatePractitionerWF;