'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CalculatorInputs {
  waterGel: number;
  nh4no3: number;
  powderFactor: number;
}

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
  const { register, handleSubmit, formState: { errors } } = useForm<CalculatorInputs>();

  const onSubmit = async (data: CalculatorInputs) => {
    try {
      const response = await fetch('/api/calculateRoyalty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const calculationResult = await response.json();
      setResult(calculationResult);
    } catch (error) {
      console.error('Calculation failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Water Gel (kg)</label>
          <input
            type="number"
            step="0.01"
            {...register('waterGel', { required: true, min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.waterGel && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">NH₄NO₃ (kg)</label>
          <input
            type="number"
            step="0.01"
            {...register('nh4no3', { required: true, min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.nh4no3 && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Powder Factor (kg/m³)</label>
          <input
            type="number"
            step="0.01"
            {...register('powderFactor', { required: true, min: 0.01 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {errors.powderFactor && <span className="text-red-500">Must be greater than 0</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Calculate Royalty
        </button>
      </form>

      {result && (
        <div className="mt-8 p-4 border rounded-lg">
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