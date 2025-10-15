import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function WorldMap() {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}
export default WorldMap;