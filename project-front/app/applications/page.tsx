import Layout from '../components/Layout';

export default function ApplicationsPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">Mining Applications</h1>
          <p className="text-lg text-[var(--foreground)] opacity-80 max-w-2xl mx-auto">
            Review and manage all mining license applications in one place.
          </p>
        </div>

        <div className="bg-[var(--background)] rounded-xl shadow-lg p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--foreground)]">
                  <th className="text-left py-4 px-6">Application ID</th>
                  <th className="text-left py-4 px-6">Applicant Name</th>
                  <th className="text-left py-4 px-6">Location</th>
                  <th className="text-left py-4 px-6">Status</th>
                  <th className="text-left py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--foreground)] opacity-70">
                  <td className="py-4 px-6">#001</td>
                  <td className="py-4 px-6">John Doe</td>
                  <td className="py-4 px-6">Colombo District</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-[var(--foreground)] hover:opacity-80 transition-opacity">
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
