import React from 'react'
import Navbar from '../navbar/page'
import Link from 'next/link'

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
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">License Portal</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {licenses.map((license) => (
              <Link href={license.path} key={license.id}>
                <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{license.name}</h2>
                  <p className="text-gray-600">{license.description}</p>
                  <div className="mt-4">
                    <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      Apply Now
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
