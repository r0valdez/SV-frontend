import React, { useState } from 'react';
import axios from 'axios';

import SuccessToast from './SuccessToast';
import ErrorToast from './ErrorToast';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export default function ProductDownload({ setLoading }) {
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [error, setError] = useState('');

  const headers = [
    { label: "Zip", key: "Zip" },
    { label: "Product", key: "Product" },
    { label: "Recorded", key: "Recorded" },
    { label: "ORG User", key: "ORG User" },
    { label: "Modified User", key: "Modified User" },
  ];

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setCsvData(null);
    if (!file) {
      setError('File is required.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_ENDPOINT}/product/download`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const csv = [
        headers.map(header => header.label).join(','),
        ...response.data.map(row =>
          headers.map(header => {
            return header.key === 'Product' ? `"${row[header.key]}"` : row[header.key]
          }).join(',')
        )
      ].join('\n');

      setCsvData(csv);
      setLoading(false);

      if (csv && csv.length > 0) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
        link.download = 'product_lookup_result.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error uploading the file:', error);
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Error looking up the products.');
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="text-xl text-center font-bold mb-2">Download - Results</h4>
      <div className="flex items-center gap-1 flex-nowrap mb-2">
        <label className="block text-sm font-medium text-gray-900 mr-2" htmlFor="file_input">CSV file to upload</label>
        <input className="block flex-1 text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file" onChange={handleFileChange} />
      </div>
      <button type="submit" className="w-32 focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 ml-32 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Download</button>
      
      {csvData && <SuccessToast message="Result downloaded successfully!" />}
      {error && <ErrorToast message={error} />}
    </form>
  );
}