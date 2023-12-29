import React, { useState } from 'react';
import { calculateOptimalRoute } from './apiService';

const RouteCalculator = () => {
    const [addressLimit, setAddressLimit] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState(0);
    const [route, setRoute] = useState([]);
    const [calculationTime, setCalculationTime] = useState(null);

    const handleAddressLimitChange = (event) => {
        setAddressLimit(event.target.value);
    };

    const handleCalculateRoute = async () => {
        if (addressLimit) {
            const startTime = performance.now(); // Start timing
            const calculatedRoute = await calculateOptimalRoute(addressLimit);
            setRoute(calculatedRoute);

            const endTime = performance.now(); // End timing
            setCalculationTime(endTime - startTime); // Set the calculation time
        } else {
            alert('Please enter a valid address limit');
        }
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
        <div>
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
        <button onClick={() => calculateOptimalRoute(addressLimit, vehicleCapacity)}>Calculate Route</button>
        
            <div>
                {Array.isArray(route) && route.map((leg, index) => (
                    <p key={index}>
                        Stop {index + 1}: ID: {leg.destinationId}, Latitude: {leg.latitude}, Longitude: {leg.longitude}, 
                        Time: {formatTime(leg.time)}, Distance: {formatDistance(leg.distance)}
                        {index > 0 ? ` from ID: ${route[index - 1].destinationId}` : ""}
                    </p>
                ))}

                {/* Display total time and distance */}
                <p>Total Time: {totals.totalTime}</p>
                <p>Total Distance: {totals.totalDistance}</p>
                {calculationTime && (
                    <p>Calculation time: {formatCalculationTime(calculationTime)}</p>
                )}
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


