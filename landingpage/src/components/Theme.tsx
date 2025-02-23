// export default function Theme() {
//   return (
//     <section id="theme" className="py-16 px-6 bg-black">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold text-white text-center mb-12">Our Theme</h2>
//         <div className="max-w-4xl mx-auto text-center">
//           <p className="text-xl text-gray-300 leading-relaxed">
//             At Ceylon Mine, we're dedicated to revolutionizing Sri Lanka's mining industry through digital transformation. 
//             Our platform streamlines licensing processes, enhances operational efficiency, and promotes sustainable mining practices.
//           </p>
//         </div>
//       </div>
//     </section>
//   )
// } 

import React from 'react';

const Theme = () => {
  return (
    <section id="theme" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,rgba(17,24,39,0)_100%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Our Vision
        </h2>
        
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-300 leading-relaxed">
            At Ceylon Mine, we're pioneering the digital transformation of Sri Lanka's mining industry. 
            Our platform combines cutting-edge technology with industry expertise to streamline processes, 
            enhance efficiency, and promote sustainable mining practices.
          </p>
          
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Innovation</h3>
              <p className="text-gray-400">Leveraging latest technology to transform traditional mining processes</p>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Efficiency</h3>
              <p className="text-gray-400">Streamlining operations through digital automation and smart solutions</p>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Sustainability</h3>
              <p className="text-gray-400">Promoting environmentally conscious mining practices for future generations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Theme;