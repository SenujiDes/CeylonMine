import Layout from '../components/Layout';

export default function StatusPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">Application Status</h1>
          <p className="text-lg text-[var(--foreground)] opacity-80 max-w-2xl mx-auto">
            Update and track the status of mining license applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[var(--background)] rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Update Status</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Application ID</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg border border-[var(--foreground)] bg-transparent"
                  placeholder="Enter application ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">New Status</label>
                <select className="w-full p-2 rounded-lg border border-[var(--foreground)] bg-transparent">
                  <option>Pending Review</option>
                  <option>Under Review</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                  <option>Additional Information Required</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Comments</label>
                <textarea
                  className="w-full p-2 rounded-lg border border-[var(--foreground)] bg-transparent h-32"
                  placeholder="Enter any additional comments"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--foreground)] text-[var(--background)] py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Update Status
              </button>
            </form>
          </div>

          <div className="bg-[var(--background)] rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Status History</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-[var(--foreground)] pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Status Updated</p>
                    <p className="text-sm opacity-70">Pending Review</p>
                  </div>
                  <span className="text-sm opacity-70">2024-03-20</span>
                </div>
              </div>
              <div className="border-l-4 border-[var(--foreground)] pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Application Submitted</p>
                    <p className="text-sm opacity-70">Initial Submission</p>
                  </div>
                  <span className="text-sm opacity-70">2024-03-19</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
