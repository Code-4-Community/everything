import React, { createRef, useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { loader, BOSTON_BOUNDS, markers } from '../../constants';
import MapLegend from '../map/MapLegend';
import styled from 'styled-components';


const MapDiv = styled.div`
  height: 100%;
`;


const SearchInput = styled.input`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 200px;
  z-index: 100;
`;


interface MapProps {
  readonly zoom: number;
}


const SampleMap: React.FC<MapProps> = ({
  zoom,
}) => {


const mapRef = useRef<HTMLDivElement | null>(null);

let map: google.maps.Map;


useEffect(() => {
  if (mapRef.current) {
    loader.load().then(() => {
      map = new google.maps.Map(mapRef.current as HTMLElement, {
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
    if (feature.placeId === 'ChIJGzE9DS1l44kRoOhiASS_fHg') { // Place ID for Boston
      return featureStyleOptions;
    }
  };


  markers.forEach(markerInfo => {
    new google.maps.Marker({
      position: { lat: markerInfo.lat, lng: markerInfo.lng },
      map: map,
      icon: markerInfo.icon,
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
  });
}
}, [zoom]);

return (
  <div>
    <MapDiv id="map" ref={mapRef} style={{ width: '100%', height: '495px' }} />
  </div>
);
};


export default SampleMap;