import React, {createRef, useCallback, useEffect, useState, useRef} from 'react';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';


//@ts-ignore
const markersArray: google.maps.Marker[] = [];

const BOSTON_BOUNDS = {
  north: 42.42,
  south: 42.2,
  west: -71.28,
  east: -70.83,
};



interface MapProps {
  readonly zoom: number;
  // readonly center: google.maps.LatLngLiteral;
  // readonly lat: number;
  // readonly lng: number;
}


const Map: React.FC<MapProps> = ({
  zoom,
}) => {
  let map: google.maps.Map;

  useEffect(() => {
    const loadMap = async () => {
      const { Map, Data} = await google.maps.importLibrary('maps') as google.maps.MapsLibrary;
      // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      map = new Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 42.36, lng: -71.06 },
    zoom: 8,
    mapId: '3aa9b524d13192b',
    restriction: {
      latLngBounds: BOSTON_BOUNDS,
      strictBounds: false,
    },
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

  const input = document.getElementById("pac-input") as HTMLInputElement;
  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["establishment"],
  };

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  const autocomplete = new google.maps.places.Autocomplete(input, options);

  const marker = new google.maps.Marker({
    map,
  });


  autocomplete.addListener("place_changed", () => {
    marker.setVisible(false);
    const place = autocomplete.getPlace();

  if (!place.geometry || !place.geometry.location) {
    // User entered the name of a Place that was not suggested and
    // pressed the Enter key, or the Place Details request failed.
    window.alert("No details available for input: '" + place.name + "'");
    return;
  }
  
  marker.setPosition(place.geometry.location);
  marker.setVisible(true);
});
};

loadMap();
}, []);

return (
<div>
  <div id="map" style={{ width: '80%', height: '400px' }}></div>
</div>
);
};



export default Map;