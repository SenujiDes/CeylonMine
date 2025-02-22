import React from 'react';

const FeatureCard = ({ title, description, icon, animation }: { title: string; description: string; icon: string; animation: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <h3 className="text-black text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <p className="text-gray-500 italic">{icon}</p>
    <p className="text-gray-500 italic">{animation}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      title: "🔖 Online Mining License Requests",
      description: "Simplifying the application and approval process. Our platform streamlines the process of applying for and obtaining mining licenses online. Miners can submit their requests digitally, track the approval status in real-time, and receive notifications for any required documentation updates or approvals. This eliminates the need for manual paperwork, reducing processing times significantly.",
      icon: "📌",
      animation: "🎬 Animation Suggestion: A smooth transition..."
    },
    {
      title: "💰 Automated Royalty Calculations",
      description: "Ensuring accuracy and transparency. Our intelligent system automates the calculation of mining royalties based on the latest industry standards and regulations. By eliminating manual calculations, we ensure accuracy, prevent disputes, and enhance financial transparency for miners and regulatory authorities alike.",
      icon: "📌",
      animation: "🎬 Animation Suggestion: A smooth transition..."
    },
    {
      title: "🤖 AI-Powered Chatbot",
      description: "Providing instant answers to mining-related queries. Our AI-driven chatbot is available 24/7 to answer questions about licensing, regulations, mining best practices, and more. It provides quick, reliable information to help miners stay informed without needing to browse multiple sources.",
      icon: "📌",
      animation: "🎬 Animation Suggestion: A smooth transition..."
    },
    {
      title: "🌍 Mine Location Mapping",
      description: "Helping miners find and manage sites efficiently. With our advanced GIS-based mapping system, miners can locate mining sites, assess terrain conditions, and analyze geographic data in real-time. This tool provides crucial insights to enhance decision-making regarding site selection and management.",
      icon: "📌",
      animation: "🎬 Animation Suggestion: A smooth transition..."
    },
    {
      title: "📂 Document Submission Portal",
      description: "Allowing easy online submissions and tracking. Miners can securely upload necessary documents, including permits, compliance reports, and safety records, through our digital submission portal. The system ensures safe storage, easy retrieval, and seamless tracking of document status.",
      icon: "📌",
      animation: "🎬 Animation Suggestion: A smooth transition..."
    },
    {
      title: "🗣️ Community Forum",
      description: "A platform for miners to connect, discuss, and share insights. Our interactive forum enables miners to discuss industry trends, share experiences, and seek advice from experts. This collaborative space fosters networking and knowledge-sharing, making it an invaluable resource for the mining community.",
      icon: "📌",
      animation: "🎬 Animation Suggestion: A smooth transition..."
    },
    {
      title: "📖 Educational Resource Hub",
      description: "Offering guides and training materials for the industry. Miners can access a rich library of tutorials, safety guides, legal updates, and best practice manuals to stay informed. Our platform supports skill development through interactive courses, webinars, and certification programs.",
      icon: "📌",
      animation: "🎬 Animation Suggestion: A smooth transition..."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Key Features of Our Mining Management Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              animation={feature.animation}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 