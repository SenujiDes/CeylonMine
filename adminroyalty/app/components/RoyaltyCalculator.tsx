'use client';

import { useState } from 'react';

interface CalculationResult {
  teq: number;
  basicVolume: number;
  expandedVolume: number;
  royalty: number;
  royaltyWithSSCL: number;
  totalAmount: number;
}

export default function RoyaltyCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [formData, setFormData] = useState({
    waterGel: '',
    nh4no3: '',
    powderFactor: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const waterGel = parseFloat(formData.waterGel);
    const nh4no3 = parseFloat(formData.nh4no3);
    const powderFactor = parseFloat(formData.powderFactor);

    // Constants
    const waterGelMultiplier = 1.2;
    const expansionFactor = 1.6;
    const powderFactorMultiplier = 2.83;
    const royaltyRate = 240;
    const ssclRate = 0.0256;
    const vatRate = 0.18;

    // Calculations
    const teq = (waterGel * waterGelMultiplier) + nh4no3;
    const basicVolume = teq / powderFactor;
    const expandedVolume = (teq * expansionFactor) / (powderFactor * powderFactorMultiplier);
    const royalty = expandedVolume * royaltyRate;
    const royaltyWithSSCL = royalty * (1 + ssclRate);
    const totalAmount = royaltyWithSSCL * (1 + vatRate);

    setResult({
      teq,
      basicVolume,
      expandedVolume,
      royalty,
      royaltyWithSSCL,
      totalAmount
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Water Gel (kg)
          </label>
          <input
            type="number"
            name="waterGel"
            value={formData.waterGel}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            NH₄NO₃ (kg)
          </label>
          <input
            type="number"
            name="nh4no3"
            value={formData.nh4no3}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Powder Factor (kg/m³)
          </label>
          <input
            type="number"
            name="powderFactor"
            value={formData.powderFactor}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Calculate Royalty
        </button>
      </form>

      {result && (
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Calculation Results</h2>
          <div className="space-y-2">
            <p>Total Explosive Quantity (TEQ): {result.teq.toFixed(2)} kg</p>
            <p>Basic Volume: {result.basicVolume.toFixed(2)} m³</p>
            <p>Expanded Volume: {result.expandedVolume.toFixed(2)} m³</p>
            <p>Royalty: Rs. {result.royalty.toFixed(2)}</p>
            <p>Royalty with SSCL: Rs. {result.royaltyWithSSCL.toFixed(2)}</p>
            <p>Total Amount (with VAT): Rs. {result.totalAmount.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
} 