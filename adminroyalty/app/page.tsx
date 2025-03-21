import RoyaltyCalculator from './components/RoyaltyCalculator';

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Rock Royalty Calculator
        </h1>
        <RoyaltyCalculator />
      </div>
    </main>
  );
} 