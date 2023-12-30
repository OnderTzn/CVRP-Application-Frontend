import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import { calculateOptimalRoute } from './apiService'; // Update this according to your API

const RoutePage = () => {
    const [route, setRoute] = useState([]);

    useEffect(() => {
        const fetchRoute = async () => {
            const calculatedRoute = await calculateOptimalRoute(/* parameters */);
            setRoute(calculatedRoute);
        };

        fetchRoute();
    }, []);

    return (
        <div style={{ height: '500px', width: '800px' }}>
            <MapContainer route={route} />
        </div>
    );
};

export default RoutePage;
