'use client';

import React from 'react'
import Navbar from '../navbar/page'
import Link from 'next/link'
import { motion } from 'framer-motion';

export default function LicensePortal() {
  const licenses = [
    {
      id: 1,
      name: 'IML Type A License',
      description: '',
      path: '/license-portal/type-a'
    },
    {
      id: 2, 
      name: 'IML Type B License',
      description: '',
      path: '/license-portal/type-b'
    },
    {
      id: 3,
      name: 'IML Type C License',
      description: '',
      path: '/license-portal/type-c'
    },
    {
      id: 4,
      name: 'IML Type D License', 
      description: '',
      path: '/license-portal/type-d'
    }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6"
    >
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-gray-100 mb-8"
        >
          License Portal
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {licenses.map((license) => (
            <motion.div
              key={license.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-700"
            >
              <Link href={license.path}>
                <h2 className="text-xl font-semibold text-gray-100 mb-2">{license.name}</h2>
                <p className="text-gray-400">{license.description}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-blue-400 hover:bg-blue-500">
                    Apply Now
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
