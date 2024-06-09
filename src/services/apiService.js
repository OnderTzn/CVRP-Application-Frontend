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

export const getAllResults = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/results/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching results:', error);
        return null;
    }
}

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

export const addAddress = async (addressData) => {
    try {
        const response = await axios.post(`${BASE_URL}/add`, addressData);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            console.error('Failed to add address');
            return null;
        }
    } catch (error) {
        console.error('Error adding address:', error);
        return null;
    }
};

export const deleteAddress = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting address');
      }
      return true;
    } catch (error) {
      console.error("Failed to delete address:", error);
      return false;
    }
};
  
export const updateAddress = async (id, addressData) => {
    try {
        const response = await axios.put(`${BASE_URL}/update/${id}`, addressData);
        if (response.status === 200) {
            return true; // Successfully updated
        } else {
            console.error('Failed to update address with ID:', id);
            return false; // Failed to update
        }
    } catch (error) {
        console.error('Error updating address:', error);
        return false; // Error occurred
    }
};

export const submitRoutingData = async (routingData) => {
    try {
        const response = await axios.post(`${BASE_URL}/calculate-route`, routingData);
        if (response.status >= 200 && response.status < 300) {
            return response.data; // Successfully submitted and received response
        } else {
            console.error('Failed to submit routing data');
            return null; // Failed to submit
        }
    } catch (error) {
        console.error('Error submitting routing data:', error);
        return null; // Error occurred
    }
};

export const uploadCsv = (formData) => {
    return axios.post(`${BASE_URL}/upload-csv`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };