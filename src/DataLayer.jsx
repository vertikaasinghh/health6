import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const DataLayer = ({ map, data }) => {
    useEffect(() => {
        if (!map || !data) return;

        const sourceId = 'health-facilities';
        if (!map.getSource(sourceId)) {
            map.addSource(sourceId, {
                type: 'geojson',
                data
            });
            map.addLayer({
                id: sourceId,
                type: 'symbol',
                source: sourceId,
                layout: {
                    'icon-image': 'hospital-15', // Make sure you have an appropriate icon in your style or uploaded to Mapbox Studio
                    'icon-size': 1.5
                }
            });
        }
    }, [map, data]);

    return null;
};

export default DataLayer;
