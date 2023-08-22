import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Loader } from "@googlemaps/js-api-loader"

let map: google.maps.Map;

// defines the boundaries for the map
const BOSTON_BOUNDS = {
  north: 42.42,
  south: 42.2,
  west: -71.28,
  east: -70.83,
};

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly"
});

loader.importLibrary("core").then(async () => {
  initMap()
});

async function initMap(): Promise<void> {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
 
  // defines the map object
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 42.36, lng: -71.06 },
    zoom: 8,
    mapId: '3aa9b524d13192b',
    restriction: {
      latLngBounds: BOSTON_BOUNDS,
      strictBounds: false,
    },
  });

  // sets the style for the boundary
  const featureLayer = map.getFeatureLayer(google.maps.FeatureType.LOCALITY);
  const featureStyleOptions: google.maps.FeatureStyleOptions = {
    strokeColor: '#50B0E6',
    strokeOpacity: 1.0,
    strokeWeight: 3.0,
    fillColor: '#50B0E6',
    fillOpacity: 0.3
  };

  //@ts-ignore
  featureLayer.style = (options: { feature: { placeId: string; }; }) => {
    if (options.feature.placeId == 'ChIJGzE9DS1l44kRoOhiASS_fHg') { // Place ID for Boston
      return featureStyleOptions;
    }
  };

}

initMap();


interface MapProps {
  readonly zoom: number;
  readonly center: google.maps.LatLngLiteral;
  // readonly lat: number;
  // readonly lng: number;
}

// creates the map object
const Map: React.FC<MapProps> = ({
  zoom,
  center,
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={{ width: '80%', height: '400px' }} center={center} zoom={zoom}>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;