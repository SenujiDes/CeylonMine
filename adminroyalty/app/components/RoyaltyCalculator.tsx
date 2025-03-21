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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
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
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
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
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
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
            className="form-input"
          />
        </div>

        <button
          type="submit"
          className="form-button"
        >
          Calculate Royalty
        </button>
      </form>

      {result && (
        <div className="result-container">
          <h2 className="result-title">Calculation Results</h2>
          <div>
            <p className="result-item">Total Explosive Quantity (TEQ): {result.teq.toFixed(2)} kg</p>
            <p className="result-item">Basic Volume: {result.basicVolume.toFixed(2)} m³</p>
            <p className="result-item">Expanded Volume: {result.expandedVolume.toFixed(2)} m³</p>
            <p className="result-item">Royalty: Rs. {result.royalty.toFixed(2)}</p>
            <p className="result-item">Royalty with SSCL: Rs. {result.royaltyWithSSCL.toFixed(2)}</p>
            <p className="result-item">Total Amount (with VAT): Rs. {result.totalAmount.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
} 