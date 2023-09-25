import { Loader } from "@googlemaps/js-api-loader";
// import { createMapIcon, MapIcon } from './components/mapIcon/MapIcon';
import { createMapPoint, MapPoint } from './components/mapIcon/MapPoint';
import { allSvgMarkers } from './components/mapIcon/MapIconDesigns';
import availableIcon from './assets/images/siteIcons/availableIcon.jpg';
import adoptedIcon from './assets/images/siteIcons/adoptedIcon.png';
import futureIcon from './assets/images/siteIcons/futureIcon.png';
import rainIcon from './assets/images/siteIcons/rainIcon.svg';
import swaleIcon from './assets/images/siteIcons/swaleIcon.svg';
import bioretentionIcon from './assets/images/siteIcons/bioretentionIcon.svg';
import porousIcon from './assets/images/siteIcons/porousIcon.svg';
import treeIcon from './assets/images/siteIcons/treeIcon.svg';


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
export type SiteType = 'Rain Garden' | 'Swales' | 'Bioretention' | 'Porous Paving' | 'Tree Planter'


interface SiteStatusOption {
    image: string;
    label: string;
    value: SiteStatus;
  }


interface SiteTypeOption {
  image: string;
  label: string;
  value: SiteType;
}

  export const SITE_STATUS_ROADMAP: SiteStatusOption[] = [
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


  export const SITE_TYPE_ROADMAP: SiteTypeOption[] = [
    {
      image: rainIcon,
      label: 'Rain Garden',
      value: 'Rain Garden',
    },
    {
      image: swaleIcon,
      label: 'Swales',
      value: 'Swales',
    },
    {
      image: bioretentionIcon,                          
      label: 'Bioretention',
      value: 'Bioretention',
    },
    {
      image: porousIcon,
      label: 'Porous Paving',
      value: 'Porous Paving',
    },
    {
      image: treeIcon,
      label: 'Tree Planter',
      value: 'Tree Planter',
    },

  ];

export const BOSTON_PLACE_ID = 'ChIJGzE9DS1l44kRoOhiASS_fHg';