import React, { useState } from 'react';
import MapContainer from './MapContainer';
import { calculateOptimalRoute } from './apiService';

const RouteCalculator = () => {
    const [addressLimit, setAddressLimit] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState(0);
    const [route, setRoute] = useState([]);
    const [calculationTime, setCalculationTime] = useState(null);
    const [algorithm, setAlgorithm] = useState('Custom');


    const handleAddressLimitChange = (event) => {
        setAddressLimit(event.target.value);
    };

    const handleCalculateRoute = async () => {
        //console.log('Calculating route with:', addressLimit, vehicleCapacity);
        if (!addressLimit || addressLimit <= 0) {
            alert('Please enter a valid address limit');
            return;
        }
    
        if (!vehicleCapacity || vehicleCapacity <= 0) {
            alert('Please enter a valid vehicle capacity');
            return;
        }
    
        const startTime = performance.now();    //Start timing
        const calculatedRoute = await calculateOptimalRoute(addressLimit, vehicleCapacity, algorithm);
        setRoute(calculatedRoute);
        console.log('Route state updated:', route);
    
        const endTime = performance.now();  //End timing
        setCalculationTime(endTime - startTime);    //Set the calculation time
    };

    const calculateTotalTimeAndDistance = () => {
        let totalTime = 0;
        let totalDistance = 0;

        route.forEach(leg => {
            totalTime += leg.time;
            totalDistance += leg.distance;
        });

        return {
            totalTime: formatTime(totalTime),
            totalDistance: formatDistance(totalDistance)
        };
    };

    const totals = calculateTotalTimeAndDistance();
    
    return (
        <div className="route-calculator"> {/* Apply flex layout */}
            <div className="route-controls"> {/* Controls panel */}
                {/* Inputs, buttons, and route details here */}
                <input 
                    type="number" 
                    value={addressLimit} 
                    onChange={(e) => setAddressLimit(e.target.value)} 
                    placeholder="Enter address limit"
                />
                <input 
                    type="number" 
                    value={vehicleCapacity} 
                    onChange={(e) => setVehicleCapacity(e.target.value)} 
                    placeholder="Enter vehicle capacity"
                />
                <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                    <option value="Custom">Custom Routing</option>
                    <option value="Dijkstra">Dijkstra's Algorithm</option>
                    {/* Add more options as you implement more algorithms */}
                </select>


                <button onClick={handleCalculateRoute}>Calculate Route</button>
                
                {/* Display Depot Information and Each Stop in the Route */}
                {/* Display total time and distance */}
                {route.length > 0 && (
                    <p>
                        Depot ID: {route[0].destinationId}, Latitude: {route[0].latitude}, Longitude: {route[0].longitude}
                    </p>
                )}
                {route.slice(1).map((leg, index) => (
                    <p key={index}>
                        Stop {index + 1}: from ID: {route[index].destinationId} to ID: {leg.destinationId}, 
                        Latitude: {leg.latitude}, Longitude: {leg.longitude}, 
                        Time: {formatTime(leg.time)}, Distance: {formatDistance(leg.distance)}
                    </p>
                ))}
                <p>Total Time: {totals.totalTime}</p>
                <p>Total Distance: {totals.totalDistance}</p>
                {calculationTime && (
                    <p>Calculation time: {formatCalculationTime(calculationTime)}</p>
                )}
            </div>

            <div className="map-container"> {/* Map display */}
                <MapContainer route={route} />
            </div>
        </div>
    );
};

export default RouteCalculator;


const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} minute${mins !== 1 ? 's' : ''} ${secs} second${secs !== 1 ? 's' : ''}`;
};

const formatDistance = (meters) => {
    const km = Math.floor(meters / 1000);
    const remainingMeters = meters % 1000;
    return `${km > 0 ? `${km} km ` : ''}${remainingMeters} meters`;
};

const formatCalculationTime = (milliseconds) => {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const remainingMilliseconds = (milliseconds % 1000).toFixed(2);

    return `${minutes} minute${minutes !== 1 ? 's' : ''} ` +
           `${seconds} second${seconds !== 1 ? 's' : ''} ` +
           `${remainingMilliseconds} millisecond${remainingMilliseconds !== 1 ? 's' : ''}`;
};


