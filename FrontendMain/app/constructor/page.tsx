'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Dashboard = ({ userName = 'User', royaltyAmount = '1,250.00', dueDate = 'March 15, 2025' }) => {
  // Initialize dark mode state
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Listen for theme changes from navbar (same as in Home component)
  useEffect(() => {
    const handleThemeChange = (event) => {
      setIsDarkMode(event.detail.isDarkMode);
    };
    
    window.addEventListener('themeChange', handleThemeChange);
    
    // Initial theme check
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
    
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`relative z-10 py-16 ${isDarkMode ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome, {userName}!
            </motion.h1>
            <motion.p 
              className={`text-lg md:text-xl max-w-3xl mx-auto ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Here is your current mining license and royalty information.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              className={`rounded-lg p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)" }}
            >
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Royalty Amount Due</h3>
              <p className={`text-3xl font-bold text-orange-500`}>
                ${royaltyAmount}
              </p>
              <p className={`mt-2 ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
                Due by: {dueDate}
              </p>
              <motion.button 
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Make Payment
              </motion.button>
            </motion.div>

            <motion.div 
              className={`rounded-lg p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)" }}
            >
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-bold mb-2">License Status</h3>
              <p className="text-lg font-medium text-green-500">Active</p>
              <p className={`mt-2 ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
                License #: ML-2025-4872
              </p>
              <p className={`${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
                Expires: December 31, 2025
              </p>
              <motion.button 
                className="mt-4 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 rounded-md text-sm font-medium transition-colors w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </motion.div>

            <motion.div 
              className={`rounded-lg p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)" }}
            >
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2">Upcoming Deadlines</h3>
              <ul className={`mt-2 ${isDarkMode ? 'opacity-80' : 'opacity-90'}`}>
                <li className="mb-2">• Royalty Payment: Mar 15, 2025</li>
                <li className="mb-2">• Quarterly Report: Apr 5, 2025</li>
                <li className="mb-2">• Environmental Audit: May 10, 2025</li>
              </ul>
              <motion.button 
                className="mt-4 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-4 rounded-md text-sm font-medium transition-colors w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Calendar
              </motion.button>
            </motion.div>
          </div>

          <div className={`rounded-lg p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg mb-12`}>
            <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { date: 'Mar 05, 2025', activity: 'Monthly production report submitted', icon: '📊' },
                { date: 'Feb 28, 2025', activity: 'Royalty payment of $1,175.50 processed', icon: '💲' },
                { date: 'Feb 15, 2025', activity: 'Site inspection completed', icon: '🔍' },
                { date: 'Feb 10, 2025', activity: 'Safety training certificate uploaded', icon: '🛡️' },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={`p-4 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} flex items-start`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mr-4 text-xl">{item.icon}</div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>{item.activity}</p>
                    <p className={`text-sm ${isDarkMode ? 'opacity-70' : 'opacity-80'}`}>{item.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.button 
              className="mt-6 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-6 rounded-md text-sm font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Activity
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className={`rounded-lg p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Submit Report', icon: '📝' },
                  { title: 'Request Inspection', icon: '👁️' },
                  { title: 'Update Information', icon: '✏️' },
                  { title: 'Contact Support', icon: '💬' },
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    className={`p-4 rounded-md ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} flex flex-col items-center justify-center transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <p className="text-sm font-medium">{action.title}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className={`rounded-lg p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Resources</h3>
              <ul className="space-y-3">
                {[
                  { title: 'Mining Regulations Guide', type: 'PDF' },
                  { title: 'Environmental Best Practices', type: 'Video' },
                  { title: 'Royalty Calculation Tutorial', type: 'Article' },
                  { title: 'License Renewal Process', type: 'Checklist' },
                ].map((resource, index) => (
                  <motion.li 
                    key={index}
                    className={`p-3 rounded-md ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} flex justify-between items-center cursor-pointer transition-colors`}
                    whileHover={{ x: 5 }}
                  >
                    <span>{resource.title}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      resource.type === 'PDF' ? 'bg-red-100 text-red-800' : 
                      resource.type === 'Video' ? 'bg-blue-100 text-blue-800' : 
                      resource.type === 'Article' ? 'bg-green-100 text-green-800' : 
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {resource.type}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <motion.button 
                className="mt-6 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-2 px-6 rounded-md text-sm font-medium transition-colors w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse All Resources
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;