import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="pt-20 pb-16 px-6 min-h-screen flex items-center">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center gap-20 mb-6">
          <span className="text-6xl md:text-8xl lg:text-9xl font-bold text-white animate-slide-left">
            Ceylon
          </span>
          <span className="text-6xl md:text-8xl lg:text-9xl font-bold text-white animate-slide-right">
            mine
          </span>
        </div>
        <p className="text-xl md:text-2xl text-gray-300 mb-12">
          A Smart Solution for the Mining Industry!
        </p>
        <Link 
          href="#features" 
          className="bg-blue-600 text-white px-12 py-4 rounded-lg hover:bg-blue-700 transition-colors inline-block text-lg"
        >
          Key Features
        </Link>
      </div>
    </section>
  )
} 