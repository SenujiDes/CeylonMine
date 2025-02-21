export default function Timeline() {
  return (
    <section id="timeline" className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex gap-4">
            <div className="w-24 text-sm font-semibold">2023</div>
            <div>
              <h3 className="font-semibold mb-2">Project Inception</h3>
              <p className="text-gray-600">Initial research and planning phase for Ceylon Mine</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-24 text-sm font-semibold">2024</div>
            <div>
              <h3 className="font-semibold mb-2">Development Phase</h3>
              <p className="text-gray-600">Building and testing the core features</p>
            </div>
          </div>
          {/* Add more timeline items as needed */}
        </div>
      </div>
    </section>
  )
} 