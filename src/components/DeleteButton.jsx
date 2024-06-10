// components/DeleteButton.jsx
import React from 'react';
import { deleteAddress } from '../services/apiService';

const DeleteButton = ({ id, onDeletionSuccess }) => {
  const handleDelete = async () => {
    // Confirmation dialog
    const isConfirmed = window.confirm(`Are you sure you want to delete ID: ${id}?`);
    if (isConfirmed) {
      const isDeleted = await deleteAddress(id);
      if (isDeleted) {
        onDeletionSuccess(id);
      } else {
        alert('Failed to delete the address. Please try again.');
      }
    }
  };

  return (
    <button className=" bg-red-500 text-white py-1 px-2.5 rounded h-7 cursor-pointer" 
      onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteButton;