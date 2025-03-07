import React from 'react'
import { FaLock, FaEnvelope, FaFacebook, FaGoogle } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2942] via-[#111827] to-[#1a2942] flex items-center justify-center">
      {/* Hero Section */}
      <div className="relative z-10">
        <form className="bg-[#1a2942]/40 backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.2)] border border-indigo-900/50 p-8 w-96 animate-fadeIn">
          <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Sign In</h1>
          <p className="text-blue-100/70 text-center mb-6">Welcome back! Please sign in to continue</p>
          
          <div className='relative mb-4'>
            <input 
              type="email"
              placeholder='Email' 
              required
              className="w-full px-4 py-2 rounded-lg pl-10 bg-[#1a2942]/60 border border-indigo-900/50 
                       text-blue-100 placeholder-blue-100/50 
                       focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50
                       hover:border-amber-400/30 transition-all duration-300"
            />
            <FaEnvelope className='absolute left-3 top-3 text-amber-400/70' />
          </div>

          <div className='relative mb-4'>
            <input 
              type="password"
              placeholder='Password' 
              required 
              className="w-full px-4 py-2 rounded-lg pl-10 bg-[#1a2942]/60 border border-indigo-900/50 
                       text-blue-100 placeholder-blue-100/50 
                       focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50
                       hover:border-amber-400/30 transition-all duration-300"
            />
            <FaLock className='absolute left-3 top-3 text-amber-400/70' />
          </div>

          <div className="flex justify-end mb-6">
            <a href="/forgot-password" className="text-amber-400 hover:text-orange-500 text-sm transition-colors duration-300">
              Forgot Password?
            </a>
          </div>

          <button 
            type='submit'
            className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-[#1a2942] py-2 rounded-lg 
                     hover:from-orange-500 hover:to-amber-400 transform hover:scale-105 
                     transition-all duration-300 font-semibold"
          >
            Sign In
          </button>

          <div className="relative my-6 text-center">
            <hr className="border-indigo-900/50" />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           bg-[#1a2942]/60 px-2 text-blue-100/70 rounded-full">
              or continue with
            </span>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 bg-[#1a2942]/60 
                       border border-indigo-900/50 text-blue-100 py-2 rounded-lg 
                       hover:bg-[#1a2942]/80 hover:border-amber-400/30 
                       transition-all duration-300"
            >
              <FaFacebook className="text-amber-400" />
              Facebook
            </button>
            <button
              type="button" 
              className="flex-1 flex items-center justify-center gap-2 bg-[#1a2942]/60 
                       border border-indigo-900/50 text-blue-100 py-2 rounded-lg 
                       hover:bg-[#1a2942]/80 hover:border-amber-400/30 
                       transition-all duration-300"
            >
              <FaGoogle className="text-amber-400" />
              Google
            </button>
          </div>

          <div className='text-center mt-4'>
            <p className="text-blue-100/70">
              Don't have an account? 
              <a href="/signup" className="text-amber-400 hover:text-orange-500 ml-1 transition-colors duration-300">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#1a2942]/20 backdrop-blur-[100px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 via-transparent to-blue-600/5"></div>
      </div>
    </div>
  )
}
