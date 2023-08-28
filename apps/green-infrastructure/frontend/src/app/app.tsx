import Map from '../components/map/SampleMap';

const App: React.FC = () => {
  const mapCenter: google.maps.LatLngLiteral = { lat: 42.36, lng: -71.06 };
 
  return (
    <div>
      <Map />
    </div>
  );
};



export default App;
