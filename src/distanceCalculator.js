import React, { useState, useEffect } from 'react';
import { getAllAddresses, calculateDistance } from './apiService';

const DistanceCalculator = () => {
    const [addresses, setAddresses] = useState([]);
    const [distanceInfo, setDistanceInfo] = useState(null);

    useEffect(() => {
        const fetchAddresses = async () => {
            const data = await getAllAddresses();
            setAddresses(data);
        };

        fetchAddresses();
    }, []);

    const handleCalculateDistance = async () => {
        const data = await calculateDistance();
        setDistanceInfo(data);
    };

    return (
        <div>
            {/* Display addresses and a button to calculate distance */}
            <button onClick={handleCalculateDistance}>Calculate Distance</button>
            {distanceInfo && <div>{JSON.stringify(distanceInfo)}</div>}
        </div>
    );
};

export default DistanceCalculator;
