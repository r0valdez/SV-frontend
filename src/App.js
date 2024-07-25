import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { ProductDownload, ProductUpload, PopulationDownload, PopulationUpload } from './components';

import './App.css';

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

function App() {
  const [loading, setLoading] = useState(false);
  
  return (
    <>
      <div className="container min-h-screen mx-auto">
        <div className="w-full pt-52 px-10 flex gap-8">
          <div className="flex-1 border border-border p-10 relative">
            <h3 className="text-3xl font-bold uppercase text-center mb-5">Product Task</h3>
            
            <div className="mb-20">
              <ProductDownload setLoading={setLoading} />
            </div>
              <ProductUpload setLoading={setLoading} />
            <div>
              
            </div>
          </div>
          <div className="flex-1 border border-border p-10">
            <h3 className="text-3xl font-bold uppercase text-center mb-5">Population Check - 5 Mile Radius</h3>

            <div className="mb-20">
              <PopulationDownload setLoading={setLoading} />
            </div>

            <div>
              <PopulationUpload setLoading={setLoading} />
            </div>
          </div>
        </div>
      </div>
      
      {loading && (
        <div style={backdropStyle}>
          <ClipLoader color="#ffffff" loading={loading} size={36} />
        </div>
      )}
    </>
  );
}

export default App;
