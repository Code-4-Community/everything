import Map from '../components/map/SampleMap';
import Divider from './Divider';
import About from './About';

export default function MapPage() {

  const mapCenter: google.maps.LatLngLiteral = { lat: 42.36, lng: -71.06 };
 
  return (
    <div>
        {/* <Header />
        <Welcome /> */}
        <Divider />
      <Map zoom={8} center={mapCenter} />
      {/* <Divider /> */}
      <About />
      <Divider />
    </div>
  );
};
