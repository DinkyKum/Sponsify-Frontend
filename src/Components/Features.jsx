import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Shield, BarChart, Users, MessageSquare, Award
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Smart Matching',
    description: 'Our AI-powered algorithm matches sponsors with the most relevant events based on industry, budget, and goals.'
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'End-to-end encrypted communication and secure payment processing for peace of mind.'
  },
  {
    icon: BarChart,
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics to track ROI, engagement metrics, and partnership success.'
  },
  {
    icon: Users,
    title: 'Verified Partners',
    description: 'All sponsors and event organizers are thoroughly verified to ensure quality partnerships.'
  },
  {
    icon: MessageSquare,
    title: 'Direct Communication',
    description: 'Built-in messaging system for seamless communication between parties.'
  },
  {
    icon: Award,
    title: 'Success Stories',
    description: 'Join thousands of successful partnerships and grow your network.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Platform Features
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to create successful sponsorship partnerships
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;