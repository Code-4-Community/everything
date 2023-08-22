import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Loader } from "@googlemaps/js-api-loader"
import { createMapIcon, MapIcon } from '../mapIcon/MapIcon';
import { allSvgMarkers } from '../mapIcon/MapIconDesigns';

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

  const markers: MapIcon[] = [
    createMapIcon("Fenway Park", 42.3467, -71.0972, allSvgMarkers.svgMarker1),
    createMapIcon("Boston Public Library", 42.3496, -71.0787, allSvgMarkers.svgMarker2),
    createMapIcon("Boston Common", 42.3554, -71.0657, allSvgMarkers.svgMarker3),
    createMapIcon("Harvard University", 42.3736, -71.1097, allSvgMarkers.svgMarker4),
    createMapIcon("MIT - Massachusetts Institute of Technology", 42.3601, -71.0942, allSvgMarkers.svgMarker5),
    createMapIcon("Freedom Trail", 42.3601, -71.0624, allSvgMarkers.svgMarker6),
    createMapIcon("New England Aquarium", 42.3601, -71.0496, allSvgMarkers.svgMarker1),
    createMapIcon("Quincy Market", 42.3601, -71.0548, allSvgMarkers.svgMarker2),
    createMapIcon("USS Constitution Museum", 42.3725, -71.0565, allSvgMarkers.svgMarker3),
    createMapIcon("Faneuil Hall", 42.3601, -71.0565, allSvgMarkers.svgMarker4),
    createMapIcon("Isabella Stewart Gardner Museum", 42.3383, -71.0989, allSvgMarkers.svgMarker5),
    createMapIcon("Museum of Fine Arts", 42.3394, -71.0941, allSvgMarkers.svgMarker6),
    createMapIcon("The Paul Revere House", 42.3634, -71.0536, allSvgMarkers.svgMarker1),
    createMapIcon("Samuel Adams Brewery", 42.3141, -71.1046, allSvgMarkers.svgMarker2),
    createMapIcon("Bunker Hill Monument", 42.3761, -71.0602, allSvgMarkers.svgMarker3),
    createMapIcon("USS Constitution", 42.3722, -71.0550, allSvgMarkers.svgMarker4),
    createMapIcon("Boston Tea Party Ships & Museum", 42.3515, -71.0491, allSvgMarkers.svgMarker5),
    createMapIcon("Copley Square", 42.3496, -71.0777, allSvgMarkers.svgMarker6),
    createMapIcon("Boston Children's Museum", 42.3525, -71.0496, allSvgMarkers.svgMarker1),
    createMapIcon("Boston University", 42.3495, -71.0994, allSvgMarkers.svgMarker2),
    createMapIcon("Prudential Center", 42.3455, -71.0825, allSvgMarkers.svgMarker3),
  ];

  markers.forEach(markerInfo => {
    new google.maps.Marker({
      position: {lat: markerInfo.lat, lng: markerInfo.lng},
      map: map,
      icon: markerInfo.icon,
    });
  });

}


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