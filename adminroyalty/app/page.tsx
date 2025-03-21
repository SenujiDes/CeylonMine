export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Explosives Royalty Calculator API</h1>
      <p className="text-lg">
        API Status: Active
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Available Endpoints:</h2>
        <ul className="list-disc pl-6">
          <li>GET /api - Health Check</li>
          <li>POST /api/calculate-royalty - Calculate Royalties</li>
        </ul>
      </div>
    </main>
  )
} 