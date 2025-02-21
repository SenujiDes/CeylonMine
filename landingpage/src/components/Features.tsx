import React from 'react';

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-black text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

const Features = () => {
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
      description: "Offering guides and training materials for industry"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 