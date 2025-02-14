'use client';

import { useState, FormEvent } from 'react';
import { toast } from 'react-hot-toast';

interface RoyaltyData {
  amount: number;
  tax: number;
  total: number;
  dueDate: string;
}

export default function RoyaltyCalculator() {
  const [minerId, setMinerId] = useState('');
  const [licenseId, setLicenseId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [royaltyData, setRoyaltyData] = useState<RoyaltyData | null>(null);

  const handleCalculateRoyalty = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/calculate-royalty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minerId, licenseId, quantity })
      });

      if (!response.ok) {
        throw new Error('Failed to calculate royalty');
      }

      const data = await response.json();
      setRoyaltyData(data);
      toast.success('Royalty calculated successfully!');
    } catch (error) {
      console.error('Error calculating royalty:', error);
      toast.error('Failed to calculate royalty. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleCalculateRoyalty} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="minerId" className="block text-sm font-medium mb-2">
              Miner ID
            </label>
            <input
              id="minerId"
              type="text"
              value={minerId}
              onChange={(e) => setMinerId(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="licenseId" className="block text-sm font-medium mb-2">
              License ID
            </label>
            <input
              id="licenseId"
              type="text"
              value={licenseId}
              onChange={(e) => setLicenseId(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium mb-2">
              Extracted Quantity (tons)
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Calculating...' : 'Calculate Royalty'}
        </button>
      </form>

      {royaltyData && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Royalty Calculation Results</h2>
          <div className="space-y-3">
            <p className="flex justify-between">
              <span>Base Amount:</span>
              <span>LKR {royaltyData.amount.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Tax:</span>
              <span>LKR {royaltyData.tax.toFixed(2)}</span>
            </p>
            <div className="border-t border-gray-700 my-2" />
            <p className="flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span>LKR {royaltyData.total.toFixed(2)}</span>
            </p>
            <p className="text-sm text-gray-400">
              Due Date: {new Date(royaltyData.dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 