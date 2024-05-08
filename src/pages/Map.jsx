import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MapContainer from "../components/MapContainer";

const Map = () => {
  const location = useLocation();
  const routingData = location.state?.routingData;

  useEffect(() => {
    if (routingData) {
      console.log("Received routing data:", routingData);
    }
  }, [routingData]);

  // Convert seconds to a more readable format (hours, minutes, and seconds)
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let formattedTime = "";
    if (hours > 0) formattedTime += `${hours}h `;
    if (minutes > 0 || hours > 0) formattedTime += `${minutes}m `;
    formattedTime += `${remainingSeconds}s`;

    return formattedTime.trim();
  };

  // Convert meters to kilometers if necessary, keeping meters as well
  const formatDistance = (meters) => {
    if (meters >= 1000) {
      const kilometers = Math.floor(meters / 1000);
      const remainingMeters = meters % 1000;
      return `${kilometers} km ${remainingMeters} m`;
    } else {
      return `${meters} m`;
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h2>Map & Routing Information</h2>
        {routingData ? (
          <ul>
            {routingData.map((route, index) => (
              <li key={index}>
                From ID: {route.originId} to ID: {route.destinationId}, Time:{" "}
                {formatTime(route.time)}, Distance:{" "}
                {formatDistance(route.distance)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No routing data available.</p>
        )}
      </div>
      <MapContainer routingData={routingData} />
    </div>
  );
};

export default Map;
