// In MapContainer.js
import React, { useEffect, useRef } from "react";

const MapContainer = ({ routingData }) => {
  const googleMapRef = useRef(null);
  const googleMap = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      // Attempt to read routing data from localStorage
      const storedRoutingData = JSON.parse(localStorage.getItem("routingData"));
      const dataToUse =
        routingData && routingData.length > 0 ? routingData : storedRoutingData;

      const initialCenter =
        dataToUse && dataToUse.length > 0
          ? { lat: dataToUse[0].latitude, lng: dataToUse[0].longitude }
          : { lat: 52.520008, lng: 13.404954 };

      if (!googleMap.current) {
        googleMap.current = new window.google.maps.Map(googleMapRef.current, {
          center: initialCenter,
          zoom: 8,
        });
      }

      if (dataToUse) {
        dataToUse.forEach((route, index) => {
          let markerOptions = {
            position: { lat: route.latitude, lng: route.longitude },
            map: googleMap.current,
          };

          if (route.originId === dataToUse[0].originId) {
            markerOptions.icon = {
              url: "http://maps.gstatic.com/mapfiles/ms2/micons/rangerstation.png",
              scaledSize: new window.google.maps.Size(50, 50),
            };
          } else {
            markerOptions.label = {
              text: String(index),
              color: "white",
              fontSize: "16px",
            };
          }

          new window.google.maps.Marker(markerOptions);
        });

        const routePath = dataToUse.map(
          (route) =>
            new window.google.maps.LatLng(route.latitude, route.longitude)
        );

        const routePolyline = new window.google.maps.Polyline({
          path: routePath,
          geodesic: true,
          strokeColor: "#FF0000", // Example: red color for the polyline
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });

        routePolyline.setMap(googleMap.current);
      }

      if (dataToUse && dataToUse.length > 0) {
        googleMap.current.setCenter(
          new window.google.maps.LatLng(
            dataToUse[0].latitude,
            dataToUse[0].longitude
          )
        );
      }
    };

    // Save new routingData to localStorage if it exists and is different from stored data
    if (routingData && routingData.length > 0) {
      const existingData = localStorage.getItem("routingData");
      if (JSON.stringify(routingData) !== existingData) {
        localStorage.setItem("routingData", JSON.stringify(routingData));
      }
    }

    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", initializeMap);

    return () => {
      googleMapScript.removeEventListener("load", initializeMap);
      window.document.body.removeChild(googleMapScript);
    };
  }, [routingData]); // Re-run effect if routingData changes

  return <div ref={googleMapRef} style={{ width: "800px", height: "800px" }} />;
};

export default MapContainer;
