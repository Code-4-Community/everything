import Map from '../../components/map/Map';
import React, { useState } from 'react';
import Divider from '../Divider';
import Resources from './Resources';
import Header from './Header';
import MapLegend from '../../components/map/MapLegend';
import Navbar from '../Navbar';
import { SITE_STATUS_ROADMAP } from '../../constants';

const icons: string[] = SITE_STATUS_ROADMAP.map((option) => option.image);

export default function VolunteerPage() {
  return (
    <div style={{ background: 'var(--Foreground, #F2F2F2)' }}>
      <Navbar />
      <div style={{ marginTop: '50px' }} />
      <Header />
      <Divider />
      <div style={{ position: 'relative' }}>
        <Map
          selectedFeatures={selectedFeatures}
          selectedStatuses={selectedStatuses}
          zoom={8}
        />
      </div>
      <Divider />
      <Resources />
      <Divider />
      <div style={{ paddingTop: '15px' }} />
    </div>
  );
}
