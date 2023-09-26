import React, { useEffect, useRef, useState } from 'react';
import { loader, BOSTON_BOUNDS, BOSTON_PLACE_ID } from '../../constants';
import { createPopupBoxContent } from '../mapIcon/PopupBox';
import styled from 'styled-components';
import { SITES } from '../../GI-Boston-Sites';
import generateCircleSVG from '../../images/markers/circle';
import generateSquareSVG from '../../images/markers/square';
import generateDiamondSVG from '../../images/markers/diamond';
import generateTriangleSVG from '../../images/markers/triangle';
import generateStarSVG from '../../images/markers/star';


const MapDiv = styled.div`
  height: 100%;
`;


function filterMarkers(selectedFeatures: string[], markers: google.maps.Marker[], map: google.maps.Map) {
  // removes all current markers
  markers.forEach((marker: google.maps.Marker) => marker.setMap(null));
  //resets markers if selected
  markers.forEach((marker: google.maps.Marker) => {
    const featureType = marker.get("featureType"); 
    // if (assetType === 'Trench drain') {
    if (selectedFeatures.includes(featureType)) {
      marker.setMap(map);
    }
  });
}


interface MapProps {
  readonly zoom: number;
  selectedFeatures: string [];
}



const Map: React.FC<MapProps> = ({
  zoom,
  selectedFeatures,
}) => {


  const mapRef = useRef<HTMLDivElement | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);


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
          if (feature.placeId === BOSTON_PLACE_ID) { // Place ID for Boston
            return featureStyleOptions;
          }
        };

        let currentInfoWindow: google.maps.InfoWindow | null = null;


        const markersArray: google.maps.Marker[] = [];




        SITES.forEach(markerInfo => {

          if (markerInfo["Lat"] != null && markerInfo["Long"] != null) {
            
            
            
            let typeColor = "red";
            const status = "Available";

            if (status === "Available") {
              typeColor = "green"
            }
            else if (status === "Unavailable") {
              typeColor = "red"
            }
            else if (status === "Taken") {
              typeColor = "blue"
            }

            const infoWindow = new google.maps.InfoWindow({
              content: createPopupBoxContent(markerInfo['Project Location'], markerInfo['Address'], 'Available', markerInfo['Asset Type'][0], typeColor),
            });
            
            let tempIcon = "";
            let featureType = "";

            if (markerInfo['Asset Type'][0] == "Bioretention area" 
            || markerInfo['Asset Type'][0] == "Vegetated swale"
            || markerInfo['Asset Type'][0] == "Trench drain"
            || markerInfo['Asset Type'][0] == "Porous asphalt"
            || markerInfo['Asset Type'][0] == "Comprehensive park renovation"
            || markerInfo['Asset Type'][0] == "Permeable pavers") {
              tempIcon = generateCircleSVG(typeColor);
              featureType = "rainIcon";
            }
            else if (markerInfo['Asset Type'][0] == "Rain garden" 
            || markerInfo['Asset Type'][0] == "Plantings/Gardens"
            || markerInfo['Asset Type'][0] == "Bioswale"
            || markerInfo['Asset Type'][0] == "Stormwater trench"
            || markerInfo['Asset Type'][0] == "Tree pit"
            || markerInfo['Asset Type'][0] == "Porous pavers") {
              tempIcon = generateDiamondSVG(typeColor);
              featureType = "swaleIcon";
            }
            else if (markerInfo['Asset Type'][0] == "Planter" 
            || markerInfo['Asset Type'][0] == "Permeable pavement - resin-bound stone"
            || markerInfo['Asset Type'][0] == "Tree infiltration trench"
            || markerInfo['Asset Type'][0] == "Porous concrete slabs"
            || markerInfo['Asset Type'][0] == "Enhanced tree trench") {
              tempIcon = generateSquareSVG(typeColor);
              featureType = "bioretentionIcon";
            }
            else if (markerInfo['Asset Type'][0] == "Stormwater planter" 
            || markerInfo['Asset Type'][0] == "Green roof"
            || markerInfo['Asset Type'][0] == "Planter boxes"
            || markerInfo['Asset Type'][0] == "Tree planter"
            || markerInfo['Asset Type'][0] == "Porous paving") {
              tempIcon = generateStarSVG(typeColor);
              featureType = "porousIcon";
            }
            else if (markerInfo['Asset Type'][0] == "Stormwater chambers" 
            || markerInfo['Asset Type'][0] == "Subsurface gravel filter"
            || markerInfo['Asset Type'][0] == "Forebay"
            || markerInfo['Asset Type'][0] == "Enhanced tree pit"
            || markerInfo['Asset Type'][0] == "Porous pavers") {
              tempIcon = generateTriangleSVG(typeColor);
              featureType = "treeIcon";
            }

            const typeIcon = `data:image/svg+xml;utf8,${encodeURIComponent(tempIcon)}`;

            const customIcon = {
              url: typeIcon,
              size: new google.maps.Size(21, 20),
              scaledSize: new google.maps.Size(21, 20),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(10, 10),
            };

            const marker: google.maps.Marker = new google.maps.Marker({
              position: { lat: markerInfo["Lat"], lng: markerInfo["Long"] },
              map: map,
              icon: customIcon
            });

            marker.set("featureType", featureType);

  
            marker.addListener('click', () => {
              if (currentInfoWindow) {
                currentInfoWindow.close();
              }
  
              infoWindow.open(map, marker);
              currentInfoWindow = infoWindow;
            });

            

            markersArray.push(marker);
            

          }



        })
        setMarkers(markersArray);
        console.log(selectedFeatures)
        filterMarkers(selectedFeatures, markersArray, map);
        


        const input = document.getElementById('pac-input') as HTMLInputElement;

        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        // const marker = new google.maps.Marker({
        //   map,
        // });

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

    

  }, [zoom, selectedFeatures]);



  return (
    <div>
      <MapDiv id="map" ref={mapRef} style={{ width: '100%', height: '495px' }} />
    </div>
  );
};


export default Map;