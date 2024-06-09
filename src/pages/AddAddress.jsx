import axios from "axios";
import React, { useState } from "react";
import CsvUpload from "../components/CsvUpload";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components";
import { addAddress } from "../services/apiService";

const AddAddress = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [unit, setUnit] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!latitude.trim() || !unit.trim()) {
      alert('Latitude and Unit fields cannot be empty.');
      return;
    }

    const addressData = {
      latitude,
      longitude: longitude.trim() ? longitude : null,
      unit,
    };

    const result = await addAddress(addressData);

    if (result !== null) {
      alert('Address added successfully');
      navigate('/addresses');
    } else {
      alert('Failed to add address');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-3xl shadow-lg">
        <Header category="Address" title="Add Address" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="latitude">Latitude:</label>
            <input
              id="latitude"
              type="text"
              required
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="mt-1 border-2 border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="longitude">Longitude:</label>
            <input
              id="longitude"
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="mt-1 border-2 border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="unit">Unit:</label>
            <input
              id="unit"
              type="text"
              required
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="mt-1 border-2 border-gray-300 rounded-md p-2"
            />
          </div>
          <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Submit
          </button>
          <Link to="/addresses" className="block text-center text-blue-500 hover:text-blue-600">
            Cancel
          </Link>
        </form>
        <div className="mt-4">
          <Header category="" title="Upload Addresses via CSV" />
          <CsvUpload />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;