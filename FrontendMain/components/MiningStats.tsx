import React from 'react';

interface MiningStatsProps {
  explosiveQuantity: number;
  blastedVolume: number;
  totalRoyalty: number;
  dueDate: string;
  lastCalculated: string;
  onDueDateChange: (date: Date) => void;
}

const MiningStats: React.FC<MiningStatsProps> = ({
  explosiveQuantity,
  blastedVolume,
  totalRoyalty,
  dueDate,
  lastCalculated,
  onDueDateChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-gray-400 text-sm">Explosive Quantity</h3>
        <p className="text-xl font-semibold">{explosiveQuantity} kg</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-gray-400 text-sm">Blasted Volume</h3>
        <p className="text-xl font-semibold">{blastedVolume} m³</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-gray-400 text-sm">Total Royalty</h3>
        <p className="text-xl font-semibold">${totalRoyalty.toFixed(2)}</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-gray-400 text-sm">Due Date</h3>
        <input
          type="date"
          value={dueDate.split('T')[0]}
          onChange={(e) => onDueDateChange(new Date(e.target.value))}
          className="bg-gray-700 px-2 py-1 rounded mt-1"
        />
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-gray-400 text-sm">Last Calculated</h3>
        <p className="text-xl font-semibold">
          {new Date(lastCalculated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default MiningStats; 