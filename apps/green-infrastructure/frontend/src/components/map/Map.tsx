import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { createPopupBoxContent } from '../mapIcon/PopupBox';
import { loader, BOSTON_BOUNDS, BOSTON_PLACE_ID, markers } from '../../constants';

let map: google.maps.Map;

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
    mapTypeControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    },
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

  featureLayer.style = (options) => {
    const feature = options.feature as google.maps.PlaceFeature;
    if (feature.placeId === BOSTON_PLACE_ID) { // Place ID for Boston
      return featureStyleOptions;
    }
  };


  // Declare a variable to keep track of the currently open InfoWindow
  let currentInfoWindow: google.maps.InfoWindow | null = null;

markers.forEach(markerInfo => {
  const marker = new google.maps.Marker({
    position: { lat: markerInfo.lat, lng: markerInfo.lng },
    map: map,
    icon: markerInfo.icon,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: createPopupBoxContent(markerInfo.name, 'location', 'status', 'type'),
  });

  marker.addListener('click', () => {
    if (currentInfoWindow) {
      currentInfoWindow.close();
    }

    infoWindow.open(map, marker);
    currentInfoWindow = infoWindow;
  });
});

  

  const input = document.getElementById('pac-input') as HTMLInputElement;

    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    const marker = new google.maps.Marker({
      map,
    });

    autocomplete.addListener('place_changed', () => {
      marker.setVisible(false);
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        window.alert(`No details available for input: '${place.name}'`);
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
    });
};


interface MapProps {
  readonly zoom: number;
  readonly center: google.maps.LatLngLiteral;
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