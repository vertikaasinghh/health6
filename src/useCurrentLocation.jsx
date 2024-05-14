import React, { useState, useEffect } from 'react';

function useCurrentLocation() {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = error => {
        console.error("Error getting location:", error);
        setLocation({
            loaded: true,
            error,
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError, { 
            maximumAge: 10000, 
            timeout: 5000,
            enableHighAccuracy: true
        });
    }, []);

    return location;
}

export default useCurrentLocation;
