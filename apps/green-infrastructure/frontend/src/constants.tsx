import { Loader } from "@googlemaps/js-api-loader";
import { createMapIcon, MapIcon } from './components/mapIcon/MapIcon';
import { allSvgMarkers } from './components/mapIcon/MapIconDesigns';

export const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "weekly"
  });

// defines the boundaries for the map
export const BOSTON_BOUNDS = {
    north: 42.42,
    south: 42.2,
    west: -71.28,
    east: -70.83,
  };

export const markers: MapIcon[] = [
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