// In MapContainer.js
import React, { useEffect, useRef } from 'react';

const MapContainer = ({ routingData }) => {
  const googleMapRef = useRef(null);
  const googleMap = useRef(null); // Use a ref to store the map instance

  useEffect(() => {
  const initializeMap = () => {
    const initialCenter = routingData && routingData.length > 0 ? 
      { lat: routingData[0].latitude, lng: routingData[0].longitude } : 
      { lat: 52.520008, lng: 13.404954 }; // Default center or first address

    if (!googleMap.current) { // Check if map is not already initialized
      googleMap.current = new window.google.maps.Map(googleMapRef.current, {
        center: initialCenter,
        zoom: 8,
      });
    }

    // Place markers for each route
    if (routingData) {
      routingData.forEach(route => {
        new window.google.maps.Marker({
          position: { lat: route.latitude, lng: route.longitude },
          map: googleMap.current,
        });
      });
    }

    // Re-center the map to the first address in routingData
    if (routingData && routingData.length > 0) {
      googleMap.current.setCenter(new window.google.maps.LatLng(routingData[0].latitude, routingData[0].longitude));
    }
  };

  const googleMapScript = document.createElement('script');
  googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  googleMapScript.async = true; // Set the script to load asynchronously
  window.document.body.appendChild(googleMapScript);

  googleMapScript.addEventListener('load', initializeMap);

  return () => {
    // Cleanup: remove script and event listener to prevent memory leaks
    googleMapScript.removeEventListener('load', initializeMap);
    window.document.body.removeChild(googleMapScript);
  };
}, [routingData]); // Re-run effect if routingData changes

  return <div ref={googleMapRef} style={{ width: '800px', height: '800px' }} />;
};

export default MapContainer;