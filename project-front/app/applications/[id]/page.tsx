import Layout from '../../components/Layout';

export default function ApplicationDetails({ params }: { params: { id: string } }) {
  // This would typically fetch data based on the ID
  const application = {
    id: params.id,
    applicantName: "Thisal Induwara",
    location: "Colombo District",
    status: "Pending",
    submissionDate: "2024-03-19",
    miningType: "IML",
    area: "2.5 hectares",
    description: "Blah blah blah",
    documents: [
      { name: "Environmental Impact Assessment", status: "Submitted" },
      { name: "Land Ownership Proof", status: "Submitted" },
      { name: "Mining Plan", status: "Pending" }
    ],
    comments: [
      {
        date: "2024-03-20",
        text: "Application received and under initial review",
        author: "System"
      }
    ]
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Application Details
          </h1>
          <p className="text-[var(--foreground)] opacity-80">
            Application ID: #{application.id}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[var(--card-background)] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm opacity-70">Applicant Name</span>
                <p className="font-medium">{application.applicantName}</p>
              </div>
              <div>
                <span className="text-sm opacity-70">Location</span>
                <p className="font-medium">{application.location}</p>
              </div>
              <div>
                <span className="text-sm opacity-70">Mining Type</span>
                <p className="font-medium">{application.miningType}</p>
              </div>
              <div>
                <span className="text-sm opacity-70">Area</span>
                <p className="font-medium">{application.area}</p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--card-background)] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Status Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm opacity-70">Current Status</span>
                <p className="font-medium">
                  <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                    {application.status}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-sm opacity-70">Submission Date</span>
                <p className="font-medium">{application.submissionDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[var(--card-background)] p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-[var(--foreground)] opacity-80">{application.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--card-background)] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Required Documents</h2>
            <div className="space-y-3">
              {application.documents.map((doc, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{doc.name}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    doc.status === 'Submitted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--card-background)] p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Comments & Updates</h2>
            <div className="space-y-4">
              {application.comments.map((comment, index) => (
                <div key={index} className="border-l-4 border-[var(--foreground)] pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{comment.text}</p>
                      <p className="text-sm opacity-70">{comment.author}</p>
                    </div>
                    <span className="text-sm opacity-70">{comment.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 