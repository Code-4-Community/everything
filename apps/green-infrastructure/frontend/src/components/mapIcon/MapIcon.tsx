export interface MapIcon {
  name: string,
  location: string,
  lat: number,
  lng: number,
  type: string,
  status: string,
  icon: {
    path: string;
    fillColor: string;
    fillOpacity: number;
    strokeWeight: number;
    rotation: number;
    scale: number;
  }
}

export function createMapIcon(
  name: string,
  location: string,
  lat: number,
  lng: number,
  type: string,
  status: string,
  icon: MapIcon["icon"]
): MapIcon {
  return {
    name: name,
    location: location,
    lat: lat,
    lng: lng,
    type: type,
    status: status,
    icon: icon,
  };
}