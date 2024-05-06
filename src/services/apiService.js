import axios from 'axios';

const BASE_URL = 'http://localhost:8080/address';

export const getAllAddresses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching addresses:', error);
        return null;
    }
};

export const calculateDistance = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/calculateDistance`);
        return response.data;
    } catch (error) {
        console.error('Error calculating distance:', error);
        return null;
    }
};

export const calculateOptimalRoute = async (addressLimit, vehicleCapacity, algorithm) => {
    try {
        const response = await axios.get(`${BASE_URL}/calculateRoute/${algorithm}/${addressLimit}/${vehicleCapacity}`);
        //console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching route:', error);
        return [];
    }
};