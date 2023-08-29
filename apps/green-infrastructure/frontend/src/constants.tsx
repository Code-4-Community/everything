import { Loader } from "@googlemaps/js-api-loader";
import { createMapIcon, MapIcon } from './components/mapIcon/MapIcon';
import { allSvgMarkers } from './components/mapIcon/MapIconDesigns';
import availableIcon from './images/siteIcons/availableIcon.svg';
import adoptedIcon from './images/siteIcons/adoptedIcon.svg';
import futureIcon from './images/siteIcons/futureIcon.svg';

export const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "weekly",
    libraries: ['places']
  });

// defines the boundaries for the map
export const BOSTON_BOUNDS = {
    north: 42.42,
    south: 42.2,
    west: -71.28,
    east: -70.83,
  };


export type SiteStatus = 'Available' | 'Adopted' | 'Future' ;


interface SiteOption {
    image: string;
    label: string;
    value: SiteStatus;
  }

  export const SITE_OPTIONS_ROADMAP: SiteOption[] = [
    {
      image: availableIcon,
      label: 'Available Sites',
      value: 'Available',
    },
    {
      image: adoptedIcon,
      label: 'Adopted Sites',
      value: 'Adopted',
    },
    {
      image: futureIcon,
      label: 'Currently Unavailable Sites',
      value: 'Future',
    },
  ];



export const markers: MapIcon[] = [
    createMapIcon("Brighton Ave and Harvard Ave Medians", 42.35213048311874, -71.13773538658145, allSvgMarkers.svgMarker1),
    createMapIcon("Boston Public Library", 42.362765076998585, -71.13121709319427, allSvgMarkers.svgMarker2),
    createMapIcon("Boston Common", 42.340361347045835, -71.06410108944645, allSvgMarkers.svgMarker3),
    createMapIcon("Harvard University", 42.34842980348787, -71.08593575875643, allSvgMarkers.svgMarker4),
    createMapIcon("MIT - Massachusetts Institute of Technology", 42.349535587485114, -71.0782304182822, allSvgMarkers.svgMarker5),
    createMapIcon("Freedom Trail", 42.35233990314435, -71.0648570606097, allSvgMarkers.svgMarker6),
    createMapIcon("New England Aquarium", 42.33503624572075, -71.15264101405859, allSvgMarkers.svgMarker1),
    createMapIcon("Quincy Market", 42.36044165447444, -71.05784367224732, allSvgMarkers.svgMarker2),
    createMapIcon("USS Constitution Museum", 42.364319153188504, -71.06324734526423, allSvgMarkers.svgMarker3),
    createMapIcon("Faneuil Hall", 42.31628090478599, -71.0930210606114, allSvgMarkers.svgMarker4),
    createMapIcon("Isabella Stewart Gardner Museum", 42.31173128348023, -71.06181415479264, allSvgMarkers.svgMarker5),
    createMapIcon("Museum of Fine Arts", 42.352581861530496, -71.06134577790948, allSvgMarkers.svgMarker6),
    createMapIcon("The Paul Revere House", 42.3631178002872, -71.05661440566897, allSvgMarkers.svgMarker1),
    createMapIcon("Samuel Adams Brewery", 42.33398610009439, -71.10643171642954, allSvgMarkers.svgMarker2),
    createMapIcon("Bunker Hill Monument", 42.3549739120233, -71.18034904711813, allSvgMarkers.svgMarker3),
    createMapIcon("USS Constitution", 42.352370004658894, -71.06553846060967, allSvgMarkers.svgMarker4),
    createMapIcon("Boston Tea Party Ships & Museum", 42.360425798954225, -71.05797241828176, allSvgMarkers.svgMarker5),
    createMapIcon("Copley Square", 42.29255811303282, -71.0845962093365, allSvgMarkers.svgMarker6)
  ];