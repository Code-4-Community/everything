import React, {createRef, useCallback, useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';
import { Loader } from "@googlemaps/js-api-loader"

let map: google.maps.Map;

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
  // const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  // map = new Map(document.getElementById("map") as HTMLElement, {
  //   center: { lat: -34.397, lng: 150.644 },
  //   zoom: 8,
  // });
  initMap()
});

async function initMap(): Promise<void> {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
 
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 42.36, lng: -71.06 },
    zoom: 8,
    mapId: '3aa9b524d13192b',
    restriction: {
      latLngBounds: BOSTON_BOUNDS,
      strictBounds: false,
    },
  });

  const marker = new AdvancedMarkerElement({
    map: map,
    position: { lat: -34.397, lng: 150.644 } ,
    title: 'Uluru'
  });

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

  const svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };

  new google.maps.Marker({
    position: { lat: 42.36, lng: -71 },
    icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    map: map,
  });

}

initMap();



// interface BasicMapData {
//   readonly map: google.maps.Map;
//   readonly zoom: number;
//   readonly markersArray: google.maps.Marker[];
// }


// interface ReturnMapData {
//   readonly searchMarker: google.maps.Marker;
// }

interface MapProps {
  readonly zoom: number;
  readonly center: google.maps.LatLngLiteral;
  // readonly lat: number;
  // readonly lng: number;
}


const Map: React.FC<MapProps> = ({
  zoom,
  center,
}) => {
  console.log("here1")
  console.log()
  console.log("here2")
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={{ width: '80%', height: '400px' }} center={center} zoom={zoom}>
      </GoogleMap>
    </LoadScript>
  );
};

//   const initMapCallback = useCallback(initMap, []);
//   const mapRef = createRef<HTMLDivElement>();
//   const [mapElement, setMapElement] = useState(mapRef.current);


//   // const thisMapData: InitMapData = {
//   //   map,
//   //   zoom,
//   //   markersArray,
//   //   };

//   // const setMapData = initMapCallback(thisMapData);

//   useEffect(() => {
//     setMapElement(mapRef.current);
//   }, [mapRef]);

//   return (
//     <>
//       <MapDiv id="map" ref={mapRef} />
//     </>
//   );
// }



export default Map;