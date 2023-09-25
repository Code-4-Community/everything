export interface MapIcon {
  path: string;
  fillColor: string;
  fillOpacity: number;
  strokeWeight: number;
  rotation: number;
  scale: number;
}

export function createMapIcon(
  path: string,
  fillColor: string,
  fillOpacity: number,
  strokeWeight: number,
  rotation: number,
  scale: number): MapIcon {
  return {
    path: path,
    fillColor: fillColor,
    fillOpacity: fillOpacity,
    strokeWeight: strokeWeight,
    rotation: rotation,
    scale: scale
  };
}