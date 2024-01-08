import React, { useEffect, useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

function createMarkerIcon(text) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 30; // Set the size of your marker
  canvas.height = 30;

  // Draw the marker (circle)
  context.fillStyle = "red";
  context.beginPath();
  context.arc(15, 15, 15, 0, Math.PI * 2);
  context.fill();

  // Add the text
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "14px Arial";
  context.fillText(text, 15, 15);

  // Convert canvas to an image
  return canvas.toDataURL();
}

const MapContainer = ({ google, route }) => {
  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  // Specify a custom marker icon for the depot
  const depotIcon = {
    url: "http://maps.gstatic.com/mapfiles/ms2/micons/rangerstation.png", // URL to a custom marker icon
    // You can add more customization like size, origin, anchor, etc. here
  };

  return (
    <Map
      google={google}
      zoom={14}
      style={mapStyles}
      className="map-container"
      initialCenter={
        route.length > 0
          ? { lat: route[0].latitude, lng: route[0].longitude }
          : { lat: 52.5267938, lng: 13.4058845 }
      }
    >
      {route.map((location, index) => {
        // Determine if the destination of the current leg is the depot
        const isDepot = location.originId === 1;

        // Define label for the marker
        const label = isDepot ? "Depot" : `Stop ${index}`;

        return (
          <Marker
            key={index}
            position={{ lat: location.latitude, lng: location.longitude }}
            title={label}
            icon={isDepot ? depotIcon : createMarkerIcon(index)}
          />
        );
      })}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
