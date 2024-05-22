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
    if (hours > 0) formattedTime += `${hours} hours `;
    if (minutes > 0 || hours > 0) formattedTime += `${minutes} meters `;
    formattedTime += `${remainingSeconds} seconds`;

    return formattedTime.trim();
  };

  // Convert meters to kilometers if necessary, keeping meters as well
  const formatDistance = (meters) => {
    if (meters >= 1000) {
      const kilometers = Math.floor(meters / 1000);
      const remainingMeters = meters % 1000;
      return `${kilometers} kilometers ${remainingMeters} meters `;
    } else {
      return `${meters} meters`;
    }
  };

  const totalTime = routingData?.reduce((acc, curr) => acc + curr.time, 0);
  const totalDistance = routingData?.reduce((acc, curr) => acc + curr.distance, 0);

  return (
  <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
    <div style={{ maxWidth: '600px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Map & Routing Information</h2>
      {routingData ? (
        <>
          <ul style={{ listStyleType: 'none', paddingLeft: '0', marginBottom: '20px' }}>
            {routingData.map((route, index) => (
              <li key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                {`${index + 1})`} From ID: {route.originId} to ID: {route.destinationId}, Time:{" "}
                {formatTime(route.time)}, Distance:{" "}
                {formatDistance(route.distance)}
              </li>
            ))}
          </ul>
          <p style={{ fontWeight: 'bold', color: '#0f172a' }}>Total Time: {formatTime(totalTime)}</p>
          <p style={{ fontWeight: 'bold', color: '#0f172a' }}>Total Distance: {formatDistance(totalDistance)}</p>
        </>
      ) : (
        <p>No routing data available.</p>
      )}
    </div>
    <MapContainer routingData={routingData} />
  </div>
);
};

export default Map;
