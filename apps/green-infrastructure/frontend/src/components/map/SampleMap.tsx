import React, {createRef, useCallback, useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';


let map: google.maps.Map;

//@ts-ignore
let featureLayer;
const markersArray: google.maps.Marker[] = [];

const BOSTON_BOUNDS = {
  north: 42.42,
  south: 42.2,
  west: -71.28,
  east: -70.83,
};

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
    strokeColor: '#810FCB',
    strokeOpacity: 1.0,
    strokeWeight: 3.0,
    fillColor: '#810FCB',
    fillOpacity: 0.5
  };

  //@ts-ignore
  featureLayer.style = (options: { feature: { placeId: string; }; }) => {
    if (options.feature.placeId == 'ChIJGzE9DS1l44kRoOhiASS_fHg') { // Place ID for Boston
      return featureStyleOptions;
    }
  };

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
  return (
    <LoadScript googleMapsApiKey='API_KEY'>
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