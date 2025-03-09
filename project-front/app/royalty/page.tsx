import Layout from '../components/Layout';

export default function RoyaltyPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">Royalty Calculator</h1>
          <p className="text-lg text-[var(--foreground)] opacity-80 max-w-2xl mx-auto">
            Calculate mining royalty fees based on production data and current rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[var(--background)] rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Input Data</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Production Volume (tons)</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-lg border border-[var(--foreground)] bg-transparent"
                  placeholder="Enter production volume"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mining Type</label>
                <select className="w-full p-2 rounded-lg border border-[var(--foreground)] bg-transparent">
                  <option>Industrial Minerals</option>
                  <option>Construction Materials</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--foreground)] text-[var(--background)] py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Calculate Royalty
              </button>
            </form>
          </div>

          <div className="bg-[var(--background)] rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Results</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg">Base Rate:</span>
                <span className="text-lg font-semibold">5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg">Royalty Amount:</span>
                <span className="text-lg font-semibold">LKR 0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg">Total Amount:</span>
                <span className="text-lg font-semibold">LKR 0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
