import { GeolocationPosition } from "@c4c/monarch/common";

async function getGeocode(
    address: string,
    extractGeocode: (address: string) => Promise<GeolocationPosition>
) {
    try {
        return extractGeocode(address);
    } catch (e) {
        console.log(e);
        throw new Error(`Unable to fetch geocode given address ${address}`);
    }
}

export default getGeocode;