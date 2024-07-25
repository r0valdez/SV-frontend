import React, { useState } from 'react';
import axios from 'axios';

import SuccessToast from './SuccessToast';
import ErrorToast from './ErrorToast';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export default function PopulationUpload({ setLoading }) {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(false);
    setError('');
    if (!file) {
      setError('File is required.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_ENDPOINT}/population/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error('Error uploading the file:', error);
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Error updating populations');
      }
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="text-xl text-center font-bold mb-2">Upload - Data Results</h4>
      <div className="flex items-center gap-1 flex-nowrap mb-2">
        <label className="block text-sm font-medium text-gray-900 mr-2" htmlFor="file_input">CSV file to upload</label>
        <input className="block flex-1 text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file" onChange={handleFileChange} />
      </div>
      <button type="submit" className="w-32 focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 ml-32 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Upload</button>

      {success && <SuccessToast message="Populations updated successfully!" />}
      {error && <ErrorToast message={error} />}
    </form>
  );
}