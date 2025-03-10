'use client';

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

interface Application {
  id: string;
  created_at: string;
  applicant_name: string;
  location: string;
  status: string;
  mining_type: string;
  area: string;
  description: string;
  submission_date: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await fetch('/api/applications');
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--foreground)]"></div>
        </div>
      </Layout>
    );
  }

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
                  <th className="text-left py-4 px-6">Mining Type</th>
                  <th className="text-left py-4 px-6">Status</th>
                  <th className="text-left py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-[var(--foreground)] opacity-70">
                    <td className="py-4 px-6">#{app.id.slice(0, 8)}</td>
                    <td className="py-4 px-6">{app.applicant_name}</td>
                    <td className="py-4 px-6">{app.location}</td>
                    <td className="py-4 px-6">{app.mining_type}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        app.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : app.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Link 
                        href={`/applications/${app.id}`}
                        className="text-[var(--foreground)] hover:opacity-80 transition-opacity"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
