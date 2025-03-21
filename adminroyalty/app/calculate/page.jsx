'use client';

import { useState } from 'react';
import axios from 'axios';

export default function CalculationPage() {
  const [formData, setFormData] = useState({
    waterGel: '',
    nh4no3: '',
    powderFactor: ''
  });
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value) || 0
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/calculateRoyalty', formData);
      setResults(response.data);
    } catch (err) {
      console.error('Error calculating royalty:', err);
      setError(err.response?.data?.error || 'Failed to calculate royalty');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mining Royalty Calculator</h1>
      
      <div className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Enter Blasting Details</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Water Gel (kg)</label>
            <input
              type="number"
              name="waterGel"
              value={formData.waterGel}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">NH4NO3 (kg)</label>
            <input
              type="number"
              name="nh4no3"
              value={formData.nh4no3}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2">Powder Factor (kg/m³)</label>
            <input
              type="number"
              name="powderFactor"
              value={formData.powderFactor}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Calculating...' : 'Calculate Royalty'}
          </button>
          
          {error && (
            <div className="mt-4 text-red-600">{error}</div>
          )}
        </form>
      </div>
      
      {results && (
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Calculation Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded">
              <h3 className="font-medium">Total Explosive Quantity (TEQ)</h3>
              <p className="text-2xl mt-2">{results.teq.toFixed(2)} kg</p>
            </div>
            
            <div className="border p-4 rounded">
              <h3 className="font-medium">Blasted Rock Volume</h3>
              <p className="text-2xl mt-2">{results.volume.toFixed(2)} m³</p>
            </div>
            
            <div className="border p-4 rounded">
              <h3 className="font-medium">Expanded Volume</h3>
              <p className="text-2xl mt-2">{results.expandedVolume.toFixed(2)} m³</p>
            </div>
            
            <div className="border p-4 rounded">
              <h3 className="font-medium">Base Royalty Fee</h3>
              <p className="text-2xl mt-2">₹ {results.royalty.toFixed(2)}</p>
            </div>
            
            <div className="border p-4 rounded">
              <h3 className="font-medium">With SSCL (2.56%)</h3>
              <p className="text-2xl mt-2">₹ {results.royaltyWithSSCL.toFixed(2)}</p>
            </div>
            
            <div className="border p-4 rounded bg-blue-50">
              <h3 className="font-medium">Total Amount (with 18% VAT)</h3>
              <p className="text-3xl font-bold text-blue-700 mt-2">₹ {results.totalWithVAT.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 