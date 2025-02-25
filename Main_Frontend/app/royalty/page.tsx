'use client';

import React, { useState } from 'react'
import Navbar from '../navbar/page'
import RoyaltyCalculator from "../components/RoyaltyCalculator";
import UserGreeting from "../components/UserGreeting";
import MiningStats from "../components/MiningStats";
import ErrorBoundary from '../components/ErrorBoundary';

interface MiningStatsType {
  explosiveQuantity: number;
  blastedVolume: number;
  totalRoyalty: number;
  dueDate: string;
  lastCalculated: string;
}

interface RoyaltyCalculationData {
  calculations: {
    total_explosive_quantity: number;
    blasted_rock_volume: number;
    total_amount_with_vat: number;
  };
  calculation_date: string;
}

export default function Royalty() {
  const [miningStats, setMiningStats] = useState<MiningStatsType>({
    explosiveQuantity: 0,
    blastedVolume: 0,
    totalRoyalty: 0,
    dueDate: '',
    lastCalculated: ''
  });

  const handleRoyaltyCalculated = (data: RoyaltyCalculationData) => {
    setMiningStats({
      explosiveQuantity: data.calculations.total_explosive_quantity,
      blastedVolume: data.calculations.blasted_rock_volume,
      totalRoyalty: data.calculations.total_amount_with_vat,
      dueDate: data.calculation_date,
      lastCalculated: data.calculation_date
    });
  };

  const handleDueDateChange = (date: Date) => {
    setMiningStats((prev: MiningStatsType) => ({
      ...prev,
      dueDate: date.toISOString()
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2942] via-[#111827] to-[#1a2942] text-white">
      <Navbar/>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#1a2942]/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center relative z-10">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 animate-gradient">
              Mining Royalty Dashboard
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100/80 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Calculate and track your mining royalties efficiently
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-blue-600/5 pointer-events-none"></div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Stats Section */}
        <div className="bg-[#1a2942]/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] 
                      border border-indigo-900/50 p-6 md:p-8 animate-fadeIn mb-8">
          <div className="mb-6">
            <UserGreeting />
          </div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-6">
            Mining Statistics
          </h2>
          <MiningStats 
            {...miningStats} 
            onDueDateChange={handleDueDateChange}
          />
        </div>

        {/* Calculator Section */}
        <div className="bg-[#1a2942]/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] 
                      border border-indigo-900/50 p-6 md:p-8 animate-fadeIn delay-200">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-8">
            Mining Royalty Calculator
          </h2>
          <ErrorBoundary>
            <RoyaltyCalculator onCalculated={handleRoyaltyCalculated} />
          </ErrorBoundary>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#1a2942]/20 backdrop-blur-[100px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 via-transparent to-blue-600/5"></div>
      </div>
    </div>
  );
}
