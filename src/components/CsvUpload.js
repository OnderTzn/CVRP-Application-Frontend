import React from 'react';
import { uploadCsv } from '../services/apiService';

const CsvUpload = () => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await uploadCsv(formData);
      if (response.status === 200) {
        alert('CSV file uploaded successfully');
        // Optionally, trigger a refresh or update the state to reflect new addresses
      } else {
        alert('Failed to upload CSV file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default CsvUpload;
