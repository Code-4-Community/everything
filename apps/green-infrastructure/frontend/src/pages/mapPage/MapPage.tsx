import Map from '../../components/map/Map';
// import Divider from '../Divider';
import About from './About';
import Navbar from '../Navbar';

export default function MapPage() {

  const mapCenter: google.maps.LatLngLiteral = { lat: 42.36, lng: -71.06 };
 
  return (
    <div>
      <Navbar />
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
