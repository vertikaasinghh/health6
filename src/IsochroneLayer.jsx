import React, { useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

const IsochroneLayer = ({ map, location, mode, time }) => {
    useEffect(() => {
        if (!map || !location || !mode || !time) return;

        const isochroneSourceId = `isochrone-${mode}-${time}`;
        if (!map.getSource(isochroneSourceId)) {
            map.addSource(isochroneSourceId, {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                }
            });
        }

        const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
        mapboxgl.accessToken = mapboxToken;

        const url = `https://api.mapbox.com/isochrone/v1/mapbox/${mode}/${location.longitude},${location.latitude}?contours_minutes=${time}&polygons=true&access_token=${mapboxgl.accessToken}`;

        axios.get(url)
            .then(response => {
                map.getSource(isochroneSourceId).setData(response.data);
                map.addLayer({
                    'id': `isochrone-layer-${mode}-${time}`,
                    'type': 'fill',
                    'source': isochroneSourceId,
                    'layout': {},
                    'paint': {
                        'fill-color': '#5a3fc0',
                        'fill-opacity': 0.5
                    }
                });
            })
            .catch(error => console.error('Error fetching isochrones: ', error));

    }, [map, location, mode, time]); // Dependencies

    return null; // This component does not render anything itself
};

export default IsochroneLayer;

