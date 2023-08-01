import { Route, Routes, Link } from 'react-router-dom';
import Map from '../components/map/SampleMap';

const App: React.FC = () => {
  
  return (
    <div>
      <Map zoom={8} />
    </div>
  );
};


export default App;
