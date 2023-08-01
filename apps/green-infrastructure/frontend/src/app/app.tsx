import { Route, Routes, Link } from 'react-router-dom';
import Map from '../components/map/SampleMap';

const App: React.FC = () => {
  const mapCenter: google.maps.LatLngLiteral = { lat: -34.397, lng: 150.644 };

  return (
    <div>
      <h1>Green Infrastructure!</h1>
      <Map zoom={8} center={mapCenter} />
    </div>
  );
};



export default App;
