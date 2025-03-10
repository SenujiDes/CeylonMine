'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '../../components/Layout';

interface Document {
  id: string;
  name: string;
  status: string;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  created_at: string;
}

interface Application {
  id: string;
  applicant_name: string;
  location: string;
  status: string;
  mining_type: string;
  area: string;
  description: string;
  submission_date: string;
  documents: Document[];
  comments: Comment[];
}

export default function ApplicationDetails() {
  const params = useParams();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplication() {
      try {
        const response = await fetch(`/api/applications/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch application');
        }
        const data = await response.json();
        setApplication(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchApplication();
    }
  }, [params.id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--foreground)]"></div>
        </div>
      </Layout>
    );
  }

  if (!application) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Application not found</h1>
        </div>
      </Layout>
    );
  }

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
                <p className="font-medium">{application.applicant_name}</p>
              </div>
              <div>
                <span className="text-sm opacity-70">Location</span>
                <p className="font-medium">{application.location}</p>
              </div>
              <div>
                <span className="text-sm opacity-70">Mining Type</span>
                <p className="font-medium">{application.mining_type}</p>
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
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    application.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : application.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {application.status}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-sm opacity-70">Submission Date</span>
                <p className="font-medium">{new Date(application.submission_date).toLocaleDateString()}</p>
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
              {application.documents.map((doc) => (
                <div key={doc.id} className="flex justify-between items-center">
                  <span>{doc.name}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    doc.status === 'submitted' 
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
              {application.comments.map((comment) => (
                <div key={comment.id} className="border-l-4 border-[var(--foreground)] pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{comment.text}</p>
                      <p className="text-sm opacity-70">{comment.author}</p>
                    </div>
                    <span className="text-sm opacity-70">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
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