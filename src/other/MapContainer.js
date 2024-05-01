import React, { useEffect, useRef } from 'react';

const MapContainer = () => {
  const googleMapRef = useRef(null);

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      new window.google.maps.Map(googleMapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 }, // Coordinates for San Francisco
        zoom: 8,
      });
    });
  }, []);

  return <div ref={googleMapRef} style={{ width: '400px', height: '300px' }} />;
};

export default MapContainer;
