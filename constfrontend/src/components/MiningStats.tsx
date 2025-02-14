'use client';

import { useState, useEffect } from 'react';

interface MiningData {
  explosiveAmount: number;
  explosiveUnit: string;
  extractedAmount: number;
  extractedUnit: string;
  paymentAmount: number;
  paymentDueDate: string;
  lastUpdated: string;
}

export default function MiningStats() {
  // This would be replaced with actual API call/data fetching
  const [miningData, setMiningData] = useState<MiningData>({
    explosiveAmount: 0,
    explosiveUnit: 'kg',
    extractedAmount: 0,
    extractedUnit: 'tons',
    paymentAmount: 0,
    paymentDueDate: '',
    lastUpdated: ''
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Explosive Usage Card */}
      <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Explosive Usage</h3>
          <span className="p-2 bg-blue-500/10 rounded-lg">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-white">{miningData.explosiveAmount}</span>
          <span className="ml-2 text-gray-400">{miningData.explosiveUnit}</span>
        </div>
      </div>

      {/* Extracted Amount Card */}
      <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Extracted Rock</h3>
          <span className="p-2 bg-green-500/10 rounded-lg">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12V8H6a2 2 0 00-2 2v4m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m16 0h-2m-4 0h-8" />
            </svg>
          </span>
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-white">{miningData.extractedAmount}</span>
          <span className="ml-2 text-gray-400">{miningData.extractedUnit}</span>
        </div>
      </div>

      {/* Payment Amount Card */}
      <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Payment Due</h3>
          <span className="p-2 bg-yellow-500/10 rounded-lg">
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-white">
            {miningData.paymentAmount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'LKR',
              currencyDisplay: 'code'
            })}
          </span>
        </div>
      </div>

      {/* Due Date Card */}
      <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-medium">Due Date</h3>
          <span className="p-2 bg-red-500/10 rounded-lg">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-white">{miningData.paymentDueDate}</span>
          <span className="text-sm text-gray-400">Last updated: {miningData.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
} 