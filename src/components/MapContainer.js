import React, { useEffect, useRef, useState } from "react";

const MapContainer = ({ routingData }) => {
  const googleMapRef = useRef(null);
  const googleMap = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const initializeMap = () => {
    if (!window.google) {
      console.error("Google Maps script not loaded");
      return;
    }

    const initialCenter = { lat: 52.520008, lng: 13.404954 };

    if (!googleMap.current) {
      googleMap.current = new window.google.maps.Map(googleMapRef.current, {
        center: initialCenter,
        zoom: 12,
      });
    }

    if (routingData && routingData.length > 0) {
      const depot = routingData[0];
      const uniqueAddresses = [];
      const visitedAddresses = [];

      routingData.forEach((route) => {
        const addressString = `${route.latitude},${route.longitude}`;

        // Skip the depot
        if (route.latitude === depot.latitude && route.longitude === depot.longitude) {
          return;
        }

        // Check if the address is already in the unique addresses array
        if (!uniqueAddresses.some(addr => addr.latitude === route.latitude && addr.longitude === route.longitude)) {
          uniqueAddresses.push({
            latitude: route.latitude,
            longitude: route.longitude,
          });
        }
      });

      const colors = ["purple", "blue", "green", "yellow", "orange", "red"];
      const totalAddresses = uniqueAddresses.length;

      uniqueAddresses.forEach((route, index) => {
        const percentage = (index / totalAddresses) * 100;
        let colorIndex;

        if (percentage < 16.67) {
          colorIndex = 0; // purple
        } else if (percentage < 33.34) {
          colorIndex = 1; // blue
        } else if (percentage < 50.01) {
          colorIndex = 2; // green
        } else if (percentage < 66.68) {
          colorIndex = 3; // yellow
        } else if (percentage < 83.35) {
          colorIndex = 4; // orange
        } else {
          colorIndex = 5; // red
        }

        let markerOptions = {
          position: { lat: route.latitude, lng: route.longitude },
          map: googleMap.current,
          icon: {
            url: `http://maps.google.com/mapfiles/ms/icons/${colors[colorIndex]}-dot.png`,
            scaledSize: new window.google.maps.Size(50, 50), // Make markers bigger
          },
          label: {
            text: String(index + 1), // Adjust index to start from 1
            color: colorIndex === 2 || colorIndex === 3 ? "black" : "white", // Adjust text color for green and yellow
            fontSize: "16px",
          },
        };

        new window.google.maps.Marker(markerOptions);
      });

      // Mark the depot with a special icon
      new window.google.maps.Marker({
        position: { lat: depot.latitude, lng: depot.longitude },
        map: googleMap.current,
        icon: {
          url: "http://maps.gstatic.com/mapfiles/ms2/micons/rangerstation.png",
          scaledSize: new window.google.maps.Size(50, 50),
        },
      });

      // Define colors for the polylines
      const newAddressColor = "#FF0000"; // Red for new addresses
      const returnDepotColor = "#0000FF"; // Blue for returning to depot

      // Create polylines for each segment
      for (let i = 0; i < routingData.length - 1; i++) {
        const segmentPath = [
          new window.google.maps.LatLng(routingData[i].latitude, routingData[i].longitude),
          new window.google.maps.LatLng(routingData[i + 1].latitude, routingData[i + 1].longitude),
        ];

        const isReturningToDepot = routingData[i + 1].latitude === depot.latitude && routingData[i + 1].longitude === depot.longitude;

        // Check if the next address is in the visited list
        const nextAddress = `${routingData[i + 1].latitude},${routingData[i + 1].longitude}`;
        const isVisited = visitedAddresses.includes(nextAddress);

        // Add the current address to the visited list
        const currentAddress = `${routingData[i].latitude},${routingData[i].longitude}`;
        if (!visitedAddresses.includes(currentAddress)) {
          visitedAddresses.push(currentAddress);
        }

        const segmentPolyline = new window.google.maps.Polyline({
          path: segmentPath,
          geodesic: true,
          strokeColor: isVisited ? returnDepotColor : newAddressColor,
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });

        segmentPolyline.setMap(googleMap.current);
      }

      // Ensure the polyline returns to the depot
      const lastSegmentPath = [
        new window.google.maps.LatLng(routingData[routingData.length - 1].latitude, routingData[routingData.length - 1].longitude),
        new window.google.maps.LatLng(depot.latitude, depot.longitude),
      ];

      const lastSegmentPolyline = new window.google.maps.Polyline({
        path: lastSegmentPath,
        geodesic: true,
        strokeColor: returnDepotColor,
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      lastSegmentPolyline.setMap(googleMap.current);

      googleMap.current.setCenter(
        new window.google.maps.LatLng(
          routingData[0].latitude,
          routingData[0].longitude
        )
      );
    }
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById("googleMapsScript");
      if (!existingScript) {
        const googleMapScript = document.createElement("script");
        googleMapScript.id = "googleMapsScript";
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
        googleMapScript.async = true;
        googleMapScript.onload = () => setIsScriptLoaded(true);
        window.document.body.appendChild(googleMapScript);
      } else {
        setIsScriptLoaded(true);
      }
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (isScriptLoaded) {
      initializeMap();
    }
  }, [isScriptLoaded, routingData]);

  return <div ref={googleMapRef} style={{ width: "800px", height: "800px" }} />;
};

export default MapContainer;