'use client'
import React, { useState } from 'react'
import Navbar from '../../navbar/page'

interface FormData {
  companyName: string;
  ownerName: string;
  businessType: string;
  employeeCount: string;
  annualRevenue: string;
  attachment: File | null;
}

export default function TypeCLicense() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    ownerName: '',
    businessType: '',
    employeeCount: '',
    annualRevenue: '',
    attachment: null
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const data = new FormData()
    data.append('companyName', formData.companyName)
    data.append('ownerName', formData.ownerName)
    data.append('businessType', formData.businessType)
    data.append('employeeCount', formData.employeeCount)
    data.append('annualRevenue', formData.annualRevenue)
    if (formData.attachment) {
      data.append('attachment', formData.attachment)
    }

    try {
      const response = await fetch('http://localhost:5000/api/licenses/type-c', {
        method: 'POST',
        body: data,
      })
      
      if (response.ok) {
        alert('License application submitted successfully!')
      } else {
        alert('Failed to submit license application')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error submitting license application')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, attachment: e.target.files[0] })
    }
  }

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Type C License Application</h1>
          <div className="bg-white shadow-sm rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Business Type</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                >
                  <option value="">Select business type</option>
                  <option value="sole-proprietorship">Sole Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Employee Count</label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.employeeCount}
                  onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Annual Revenue</label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.annualRevenue}
                  onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Required Documents</label>
                <input
                  type="file"
                  required
                  className="mt-1 block w-full"
                  onChange={handleFileChange}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Please upload business registration documents (PDF format only)
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
} 