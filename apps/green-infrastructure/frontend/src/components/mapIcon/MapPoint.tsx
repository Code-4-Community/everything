import { MapIcon } from './MapIcon';

export interface MapPoint {
    name: string,
    lat: number,
    lng: number,
    icon: MapIcon;
}

export function createMapPoint(
    name: string,
    lat: number,
    lng: number,
    icon: MapIcon
): MapPoint {
    return {
        name: name,
        lat: lat,
        lng: lng,
        icon: icon,
    };
}