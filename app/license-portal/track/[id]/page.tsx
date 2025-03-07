'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../navbar/page';
import ApplicationTimeline from '../../../components/ApplicationTimeline';

export default function TrackApplication() {
  const params = useParams();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/applications/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setApplication(data);
        }
      } catch (error) {
        console.error('Error fetching application:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!application) {
    return <div>Application not found</div>;
  }

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Application Status: {application.status}
          </h1>
          <div className="bg-white shadow-sm rounded-lg p-6">
            <ApplicationTimeline 
              events={application.timeline}
              currentStatus={application.status}
            />
          </div>
        </div>
      </div>
    </main>
  );
} 