'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../navbar/page';
import ApplicationTimeline from '../../../components/ApplicationTimeline';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700"
        >
          <h2 className="text-3xl font-semibold text-gray-100 mb-6">
            Track License Status
          </h2>
          
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
              <div className="flex-1">
                <p className="text-sm text-gray-400">License ID</p>
                <p className="text-lg font-medium text-gray-100">{params.id}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-300">
                  Active
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
} 