import React, { useState, useEffect } from "react";
import { getAllAddresses, submitRoutingData } from "../services/apiService";

const Routing = () => {
  const [addresses, setAddresses] = useState([]);
  const [depot, setDepot] = useState("");
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const [vehicleCapacity, setVehicleCapacity] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      const data = await getAllAddresses();
      console.log(data);
      if (data) {
        const addressesWithSelection = data.map(address => ({
          ...address,
          isSelected: false
        }));
        setAddresses(addressesWithSelection);
      }
    };
    fetchAddresses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const routingData = {
      depot,
      addressList: selectedAddresses,
      vehicleCapacity: Number(vehicleCapacity),
    };
    console.log(routingData);
    
    const response = await submitRoutingData(routingData);
    if (response) {
      console.log('Routing data submitted successfully:', response);
    } else {
      console.error('Failed to submit routing data');
    }
  };  

  const handleAddressCheck = (id) => {
    const updatedAddresses = addresses.map(address => {
      if (address.id === id) {
        return { ...address, isSelected: !address.isSelected };
      }
      return address;
    });
    setAddresses(updatedAddresses);

    const selected = updatedAddresses.filter(address => address.isSelected).map(address => address.id);
    setSelectedAddresses(selected);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-5">Routing Configuration</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="depot">
            Depot Address:
          </label>
          <select
            id="depot"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={depot}
            onChange={(e) => setDepot(e.target.value)}
          >
            <option value="">Select a depot</option>
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {`ID: ${address.id}, Lat: ${address.latitude}, Long: ${address.longitude}, Unit: ${address.unit}`}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Target Addresses:
          </label>
          {addresses.map((address) => (
            <div key={address.id} className="mb-2">
              <input
                type="checkbox"
                id={`address-${address.id}`}
                checked={address.isSelected}
                onChange={() => handleAddressCheck(address.id)}
              />
              <label htmlFor={`address-${address.id}`} className="ml-2">
                {`ID: ${address.id}, Lat: ${address.latitude}, Long: ${address.longitude}, Unit: ${address.unit}`}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicle-capacity">
            Vehicle Capacity:
          </label>
          <input
            id="vehicle-capacity"
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Routing Data
        </button>
      </form>
    </div>
  );
};

export default Routing;