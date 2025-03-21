import { useState } from 'react';

interface CalculationResult {
  teq: number;
  blastedRockVolume: number;
  expandedBlastedRockVolume: number;
  royalty: number;
  royaltyWithSSCL: number;
  totalAmountDue: number;
}

export default function RoyaltyCalculator() {
  const [inputs, setInputs] = useState({
    waterGel: '',
    nh4no3: '',
    powderFactor: '',
  });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/calculate-royalty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          waterGel: Number(inputs.waterGel),
          nh4no3: Number(inputs.nh4no3),
          powderFactor: Number(inputs.powderFactor),
        }),
      });

      if (!response.ok) {
        throw new Error('Calculation failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to calculate royalty. Please check your inputs.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Royalty Calculator</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Water Gel (kg)</label>
          <input
            type="number"
            name="waterGel"
            value={inputs.waterGel}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">NH4NO3 (kg)</label>
          <input
            type="number"
            name="nh4no3"
            value={inputs.nh4no3}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Powder Factor</label>
          <input
            type="number"
            name="powderFactor"
            value={inputs.powderFactor}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Calculate
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-4">Results:</h2>
          <div className="space-y-2">
            <p>Total Explosive Quantity: {result.teq.toFixed(2)} kg</p>
            <p>Blasted Rock Volume: {result.blastedRockVolume.toFixed(2)} m³</p>
            <p>Expanded Blasted Rock Volume: {result.expandedBlastedRockVolume.toFixed(2)} m³</p>
            <p>Royalty: ₹{result.royalty.toFixed(2)}</p>
            <p>Royalty with SSCL: ₹{result.royaltyWithSSCL.toFixed(2)}</p>
            <p>Total Amount Due: ₹{result.totalAmountDue.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
} 