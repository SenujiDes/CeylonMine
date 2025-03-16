import React, { useState } from 'react';

interface RoyaltyCalculatorProps {
  onCalculated: (data: any) => void;
}

const RoyaltyCalculator: React.FC<RoyaltyCalculatorProps> = ({ onCalculated }) => {
  const [explosiveQuantity, setExplosiveQuantity] = useState<number>(0);
  const [rockVolume, setRockVolume] = useState<number>(0);

  const handleCalculate = () => {
    // Mock calculation for demonstration
    const calculations = {
      total_explosive_quantity: explosiveQuantity,
      blasted_rock_volume: rockVolume,
      total_amount_with_vat: explosiveQuantity * rockVolume * 0.1, // Example calculation
    };

    onCalculated({
      calculations,
      calculation_date: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Explosive Quantity (kg)
        </label>
        <input
          type="number"
          value={explosiveQuantity}
          onChange={(e) => setExplosiveQuantity(Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-800 rounded-md text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Rock Volume (m³)
        </label>
        <input
          type="number"
          value={rockVolume}
          onChange={(e) => setRockVolume(Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-800 rounded-md text-white"
        />
      </div>
      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md"
      >
        Calculate Royalty
      </button>
    </div>
  );
};

export default RoyaltyCalculator; 