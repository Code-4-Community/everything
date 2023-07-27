import React, {createRef, useCallback, useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';


let map: google.maps.Map;
const markersArray: google.maps.Marker[] = [];

async function initMap(): Promise<void> {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 42.36, lng: -71.06 },
    zoom: 8,
    mapId: '3aa9b524d13192b',
  });

  const marker = new AdvancedMarkerElement({
    map: map,
    position: { lat: -34.397, lng: 150.644 } ,
    title: 'Uluru'
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
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''} >
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