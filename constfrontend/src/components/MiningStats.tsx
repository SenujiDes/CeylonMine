'use client';

import { useState } from 'react';

interface MiningData {
  explosiveQuantity: number;
  blastedVolume: number;
  totalRoyalty: number;
  dueDate: string;
  lastCalculated: string;
}

export default function MiningStats() {
  const [miningData, setMiningData] = useState<MiningData>({
    explosiveQuantity: 0,
    blastedVolume: 0,
    totalRoyalty: 0,
    dueDate: '',
    lastCalculated: ''
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Explosive Quantity Card */}
      <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Total Explosive Quantity</h3>
          <span className="p-2 bg-blue-500/10 rounded-lg">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-white">{miningData.explosiveQuantity.toFixed(2)}</span>
          <span className="ml-2 text-gray-400">kg</span>
        </div>
      </div>

      {/* Blasted Rock Volume Card */}
      <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Blasted Rock Volume</h3>
          <span className="p-2 bg-green-500/10 rounded-lg">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12V8H6a2 2 0 00-2 2v4m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m16 0h-2m-4 0h-8" />
            </svg>
          </span>
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-white">{miningData.blastedVolume.toFixed(2)}</span>
          <span className="ml-2 text-gray-400">m³</span>
        </div>
      </div>

      {/* Total Royalty Amount Card */}
      <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Total Royalty</h3>
          <span className="p-2 bg-yellow-500/10 rounded-lg">
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-white">
            LKR {miningData.totalRoyalty.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Due Date Card */}
      <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Payment Due Date</h3>
          <span className="p-2 bg-red-500/10 rounded-lg">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-white">
            {miningData.dueDate ? new Date(miningData.dueDate).toLocaleDateString() : 'Not Set'}
          </span>
          <span className="text-sm text-gray-400">
            Last Calculated: {miningData.lastCalculated ? new Date(miningData.lastCalculated).toLocaleString() : 'Not Available'}
          </span>
        </div>
      </div>
    </div>
  );
} 