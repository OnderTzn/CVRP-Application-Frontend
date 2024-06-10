import React, { useState } from 'react';
import { updateAddress } from '../services/apiService';
import SimpleModal from './SimpleModal';

const EditButton = ({ id, latitude, longitude, unit, onEditSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLatitude, setEditedLatitude] = useState(latitude);
  const [editedLongitude, setEditedLongitude] = useState(longitude);
  const [editedUnit, setEditedUnit] = useState(unit);
  const [error, setError] = useState('');

  const validateInputs = () => {
    const latitudeValue = parseFloat(editedLatitude);
    const longitudeValue = parseFloat(editedLongitude);
    const unitValue = parseInt(editedUnit, 10);

    if (isNaN(latitudeValue) || isNaN(longitudeValue)) {
      setError('Latitude and Longitude must be valid double values.');
      return false;
    }
    if (isNaN(unitValue) || !Number.isInteger(unitValue)) {
      setError('Unit must be a valid integer.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    const updated = await updateAddress(id, { latitude: parseFloat(editedLatitude), longitude: parseFloat(editedLongitude), unit: parseInt(editedUnit, 10) });
    if (updated) {
      onEditSuccess(id, parseFloat(editedLatitude), parseFloat(editedLongitude), parseInt(editedUnit, 10));
      setIsEditing(false);
    } else {
      alert('Failed to update the address. Please try again.');
    }
  };

  return (
    <>
      <button className="bg-blue-500 text-white py-1 px-2.5 rounded h-7 cursor-pointer" onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <SimpleModal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-between items-center gap-2.5">
            <label className="min-w-[80px]" htmlFor="latitude">Latitude:</label>
            <input id="latitude" className="flex-1 p-2.5 rounded border border-gray-300" type="text" value={editedLatitude} onChange={(e) => setEditedLatitude(e.target.value)} />
          </div>
          <div className="flex justify-between items-center gap-2.5">
            <label className="min-w-[80px]" htmlFor="longitude">Longitude:</label>
            <input id="longitude" className="flex-1 p-2.5 rounded border border-gray-300" type="text" value={editedLongitude} onChange={(e) => setEditedLongitude(e.target.value)} />
          </div>
          <div className="flex justify-between items-center gap-2.5">
            <label className="min-w-[80px]" htmlFor="unit">Unit:</label>
            <input id="unit" className="flex-1 p-2.5 rounded border border-gray-300" type="text" value={editedUnit} onChange={(e) => setEditedUnit(e.target.value)} />
          </div>
          <div className="flex justify-center gap-2.5">
            <button type="submit" className="bg-green-500 text-white p-2.5 rounded cursor-pointer">Submit</button>
            <button type="button" className="bg-red-500 text-white p-2.5 rounded cursor-pointer" onClick={() => setIsEditing(false)}>Cancel</button>            
          </div>
        </form>
      </SimpleModal>
    </>
  );
};

export default EditButton;