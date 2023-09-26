import Map from '../../components/map/Map';
import React, { useState } from 'react';
import Divider from '../Divider';
import About from './About';
import Header from './Header';
import MapLegend from '../../components/map/MapLegend';
import Navbar from '../Navbar';
import { SITE_STATUS_ROADMAP } from '../../constants';

const icons: string[] = SITE_STATUS_ROADMAP.map((option) => option.image);


export default function MapPage() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);



  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '50px'}} />
      <Header />
      <Divider />
      <div style={{ position: 'relative' }}>
        <Map selectedFeatures={selectedFeatures} zoom={8} />
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 100 }}>
          <MapLegend selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} icons={icons} />
        </div>
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 100 }}>
          <input id="pac-input" type="text" placeholder="Search Box" />
        </div>
      </div>
      <Divider />
      <About />
    </div>
  );
}
