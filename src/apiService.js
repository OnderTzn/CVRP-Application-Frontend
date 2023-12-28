import axios from 'axios';

const BASE_URL = 'http://localhost:8080/address';

export const getAllAddresses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching addresses:', error);
    }
};

export const calculateDistance = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/calculateDistance`);
        return response.data;
    } catch (error) {
        console.error('Error calculating distance:', error);
    }
};

