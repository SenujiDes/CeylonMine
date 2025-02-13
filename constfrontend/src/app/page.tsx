import Image from "next/image";
import Link from "next/link";
import RoyaltyCalculator from "@/components/RoyaltyCalculator";
import UserGreeting from "@/components/UserGreeting";
import MiningStats from "@/components/MiningStats";

export default function Home() {
  // This data would come from your backend
  const miningData = {
    explosiveAmount: 5000,
    extractedRockAmount: 25000,
    paymentAmount: 150000 * 320, // Converting to LKR (assuming 1 USD = 320 LKR)
    paymentDueDate: "2024-03-15"
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* User Greeting Section */}
        <div className="bg-gray-900 rounded-lg shadow-xl p-6 md:p-8">
          <UserGreeting />
        </div>

        {/* Mining Stats Section */}
        <div className="bg-gray-900 rounded-lg shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Mining Statistics</h2>
          <MiningStats {...miningData} />
        </div>

        {/* Calculator Section */}
        <div className="bg-gray-900 rounded-lg shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-8">Mining Royalty Calculator</h2>
          <RoyaltyCalculator />
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
