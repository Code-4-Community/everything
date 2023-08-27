import Map from '../components/map/SampleMap';

export default function MapPage() {

  const mapCenter: google.maps.LatLngLiteral = { lat: 42.36, lng: -71.06 };
 
  return (
    <div>
        {/* <Header />
        <Welcome />
        <Divider /> */}
        <p>Hello</p>
      <Map zoom={8} center={mapCenter} />
      <p>Hi</p>
      {/* <Divider />
      <About /> */}
    </div>
  );
};
