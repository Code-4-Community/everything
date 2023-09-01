import Map from '../components/map/Map';
import React, { useState } from 'react';
import Divider from './Divider';
import About from './About';
import Header from '../pages/Header';
import MapLegend from '../components/map/MapLegend';

export default function MapPage() {

  return (
    <div>
      <Header />
      <Divider />
      <div style={{ position: 'relative' }}>
        <Map zoom={8} />
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 100 }}>
          <MapLegend />
        </div>
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 100 }}>
          <input id="pac-input" type="text" placeholder="Search Box" />
        </div>
      </div>
      <About />
      <Divider />
    </div>
  );
};
