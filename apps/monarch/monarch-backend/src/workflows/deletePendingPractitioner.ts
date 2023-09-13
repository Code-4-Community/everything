import { Key } from "@c4c/monarch/common";
import { Request } from "express";

async function deletePendingPractitionerWF(req: Request, deletePendingPractitioner: (req: Request) => Promise<Key>) {
    try {
        return deletePendingPractitioner(req);
    } catch (e) {
        console.log(e);
        throw new Error("Unable to post practitioner");
    }
}

export default deletePendingPractitionerWF;