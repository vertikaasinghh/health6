import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Access and log the Mapbox token from environment variables
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
console.log("Mapbox Token in main.jsx:", mapboxToken);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
);
