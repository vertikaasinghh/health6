import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom'; // Import ReactDOM
import useCurrentLocation from './useCurrentLocation'; // Import the hook
import HospitalInfoComponent from './HospitalInfoComponent'; // Import the new component


function MapComponent({ selectedHospital }) {
const mapContainer = useRef(null);
const map = useRef(null);
const marker = useRef(null);
const { loaded, coordinates, error } = useCurrentLocation(); // Use the hook

useEffect(() => {
if (!loaded) return; // Do not initialize the map until location is loaded

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = mapboxToken;

map.current = new mapboxgl.Map({
container: mapContainer.current,
style: 'mapbox://styles/aayuyushi/clr3hkxjk017g01r56jp013gd',
center: [coordinates.lng, coordinates.lat], // Use coordinates from the hook
zoom: 15
});

map.current.on('load', () => {
// Add marker at the user's current location
marker.current = new mapboxgl.Marker()
.setLngLat([coordinates.lng, coordinates.lat])
.addTo(map.current);
});

return () => {
if (map.current) {
map.current.remove();
}
};
}, [loaded, coordinates]);

useEffect(() => {
if (!loaded || !map.current) return; // Ensure everything is loaded

if (selectedHospital) {
  // Ensure the marker is created
  if (!marker.current) {
    marker.current = new mapboxgl.Marker()
      .setLngLat([selectedHospital.Longitude, selectedHospital.Latitude])
      .addTo(map.current);
  } else {
    marker.current.setLngLat([selectedHospital.Longitude, selectedHospital.Latitude]);
  }

  // Create or update the popup
  const popupContent = document.createElement('div');
  ReactDOM.render(<HospitalInfoComponent hospital={selectedHospital} />, popupContent);

  const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, closeOnClick: false })
    .setDOMContent(popupContent);

  marker.current.setPopup(popup);

  // Attach mouse events to the marker
  marker.current.getElement().addEventListener('mouseenter', () => {
    if (map.current) popup.addTo(map.current);
  });
  marker.current.getElement().addEventListener('mouseleave', () => popup.remove());

  // Fly to the new location
  map.current.flyTo({
    center: [selectedHospital.Longitude, selectedHospital.Latitude],
    essential: true,
    zoom: 15
  });
}
}, [loaded, coordinates, selectedHospital, map.current]);
 // Include map.current in dependencies

if (error) {
return <div>Error: {error.message}</div>;
}

if (!loaded) {
return <div>Loading map...</div>;
}

return <div ref={mapContainer} style={{ width: '100vw', height: '100vh' }}></div>;
}


export default MapComponent;

