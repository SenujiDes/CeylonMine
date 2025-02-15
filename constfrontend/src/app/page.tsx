'use client';

import Image from "next/image";
import Link from "next/link";
import RoyaltyCalculator from "@/components/RoyaltyCalculator";
import UserGreeting from "@/components/UserGreeting";
import MiningStats from "@/components/MiningStats";
import ErrorBoundary from '@/components/ErrorBoundary';
import { useState } from 'react';

export default function Home() {
  const [miningStats, setMiningStats] = useState({
    explosiveQuantity: 0,
    blastedVolume: 0,
    totalRoyalty: 0,
    dueDate: '',
    lastCalculated: ''
  });

  const handleRoyaltyCalculated = (data: any) => {
    setMiningStats({
      explosiveQuantity: data.calculations.total_explosive_quantity,
      blastedVolume: data.calculations.blasted_rock_volume,
      totalRoyalty: data.calculations.total_amount_with_vat,
      dueDate: data.calculation_date, // Assuming this is the due date
      lastCalculated: data.calculation_date
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {/* User Greeting and Mining Stats Box */}
        <div className="bg-gray-900 rounded-lg shadow-xl p-6 md:p-8">
          <UserGreeting />
          <h2 className="text-2xl font-bold mb-6">Mining Statistics</h2>
          <MiningStats {...miningStats} />
        </div>

        {/* Royalty Calculator Box */}
        <div className="bg-gray-900 rounded-lg shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-8">Mining Royalty Calculator</h2>
          <ErrorBoundary>
            <RoyaltyCalculator onCalculated={handleRoyaltyCalculated} />
          </ErrorBoundary>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 Mining Company. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
