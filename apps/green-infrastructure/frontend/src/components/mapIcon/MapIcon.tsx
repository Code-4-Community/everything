export interface MapIcon {
  name: string,
  lat: number,
  lng: number,
  icon: {
    path: string;
    fillColor: string;
    fillOpacity: number;
    strokeWeight: number;
    rotation: number;
    scale: number;
    anchor: google.maps.Point;
  };
}

export function createMapIcon(
  name: string,
  lat: number,
  lng: number,
  icon: MapIcon["icon"]
): MapIcon {
  return {
    name: name,
    lat: lat,
    lng: lng,
    icon: icon,
  };
}