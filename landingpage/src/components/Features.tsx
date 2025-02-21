export default function Features() {
  const features = [
    {
      title: "Online Mining License Requests",
      description: "Simplifying the application and approval process"
    },
    {
      title: "Automated Royalty Calculations",
      description: "Ensuring accuracy and transparency"
    },
    {
      title: "AI-Powered Chatbot",
      description: "Providing instant answers to mining-related queries"
    },
    {
      title: "Mine Location Mapping",
      description: "Helping miners find and manage sites efficiently"
    },
    {
      title: "Document Submission Portal",
      description: "Allowing easy online submissions and tracking"
    },
    {
      title: "Community Forum",
      description: "A platform for miners to connect, discuss, and share insights"
    },
    {
      title: "Educational Resource Hub",
      description: "Offering guides and training materials for industry professionals"
    }
  ]

  return (
    <section id="features" className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-black text-center mb-12">
          Key Features of Ceylon Mine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-black p-6 rounded-lg hover:bg-gray-900 transition-colors">
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 