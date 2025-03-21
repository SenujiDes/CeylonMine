import RoyaltyCalculator from './components/RoyaltyCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Rock Royalty Calculator
        </h1>
        <RoyaltyCalculator />
      </div>
    </main>
  );
} 