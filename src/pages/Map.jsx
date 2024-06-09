import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MapContainer from "../components/MapContainer";
import { Box, Typography, List, ListItem, Divider, Paper } from '@mui/material';

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
    if (minutes > 0 || hours > 0) formattedTime += `${minutes} minutes `;
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
    <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', flexWrap: 'wrap' }}>
      <Paper sx={{ maxWidth: '800px', padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h4" gutterBottom>Map & Routing Information</Typography>
        {routingData ? (
          <>
            <List>
              {routingData.map((route, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <Typography variant="body1">
                      {`${index + 1}) From ID: ${route.originId} to ID: ${route.destinationId}, Time: ${formatTime(route.time)}, Distance: ${formatDistance(route.distance)}`}
                    </Typography>
                  </ListItem>
                  {index < routingData.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Typography variant="h6" color="primary">Total Time: {formatTime(totalTime)}</Typography>
            <Typography variant="h6" color="primary">Total Distance: {formatDistance(totalDistance)}</Typography>
          </>
        ) : (
          <Typography>No routing data available.</Typography>
        )}
      </Paper>
      <Box sx={{ width: '800px', height: '800px', marginBottom: '20px' }}>
        <MapContainer routingData={routingData} />
      </Box>
    </Box>
  );
};

export default Map;
