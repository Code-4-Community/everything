import { Key } from "@c4c/monarch/common";
import { Request } from "express";

async function deletePractitionerWF(req: Request, deletePractitioner: (req: Request) => Promise<Key>) {
    try {
        return deletePractitioner(req);
    } catch (e) {
        console.log(e);
        throw new Error("Unable to post practitioner");
    }
}

export default deletePractitionerWF;