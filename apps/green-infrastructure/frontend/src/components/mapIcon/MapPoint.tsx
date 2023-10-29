import { MapIcon } from './MapIcon';

export interface MapPoint {
    name: string,
    type: string,
    address: string,
    status: string,
    lat: number,
    lng: number,
    icon: MapIcon;
}

export function createMapPoint(
    name: string,
    type: string,
    address: string,
    status: string,
    lat: number,
    lng: number,
    icon: MapIcon
): MapPoint {
    return {
        name: name,
        type: type,
        address: address,
        status: status,
        lat: lat,
        lng: lng,
        icon: icon,
    };
}