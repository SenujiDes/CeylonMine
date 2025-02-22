"use client"

import React from 'react'
import Link from 'next/link'

const Contact = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto flex justify-between">
        {/* Contact Details on the Left */}
        <div className="w-1/2 text-lg text-gray-700">
          <h2 className="text-3xl font-bold text-black mb-8">Contact Us</h2>
          <p className="mb-4">Address: 123 Ceylon Mine St, Colombo, Sri Lanka</p>
          <p className="mb-4">Phone: +94 123 456 789</p>
          <p className="mb-4">Email: contact@ceylonmine.com</p>
        </div>

        {/* Follow Us Section on the Right */}
        <div className="w-1/2 text-center">
          <h3 className="text-2xl font-semibold text-black mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <Link href="https://www.linkedin.com/in/yourprofile" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600 hover:text-blue-800 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 00-12 0v8a6 6 0 0012 0V8z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v4m0-4a4 4 0 00-4-4m4 4a4 4 0 014 4m-4-4a4 4 0 00-4 4" />
              </svg>
            </Link>
            <Link href="https://www.instagram.com/yourprofile" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-pink-600 hover:text-pink-800 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 01-8-8 8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8zm4-12a1 1 0 00-1-1 1 1 0 00-1 1v1a1 1 0 001 1 1 1 0 001-1V8zm-4 1a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 