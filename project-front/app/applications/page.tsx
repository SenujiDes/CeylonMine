import Layout from '../components/Layout';
import Link from 'next/link';

export default function ApplicationsPage() {
  const applications = [
    {
      id: "001",
      applicantName: "Thisal Induwara",
      location: "Kalutara District",
      status: "Pending",
      submissionDate: "2024-03-19"
    },
    {
      id: "002",
      applicantName: "Janindu Amaraweera",
      location: "Galle District",
      status: "Under Review",
      submissionDate: "2024-03-18"
    }
  ];

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
                  <th className="text-left py-4 px-6">Submission Date</th>
                  <th className="text-left py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-[var(--foreground)] opacity-70">
                    <td className="py-4 px-6">#{app.id}</td>
                    <td className="py-4 px-6">{app.applicantName}</td>
                    <td className="py-4 px-6">{app.location}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        app.status === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">{app.submissionDate}</td>
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

export interface Application {
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

export interface Document {
  id: string;
  application_id: string;
  name: string;
  status: string;
  created_at: string;
}

export interface Comment {
  id: string;
  application_id: string;
  text: string;
  author: string;
  created_at: string;
}
