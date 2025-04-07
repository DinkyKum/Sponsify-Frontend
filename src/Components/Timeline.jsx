import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle2, Handshake, MessageSquare, CheckCircle2, DollarSign } from 'lucide-react';

const timelineSteps = [
  {
    title: 'Sign Up',
    description: 'Create your account as a sponsor or event organizer',
    icon: UserCircle2,
  },
  {
    title: 'Connect',
    description: 'Find the perfect sponsor or event that matches your needs',
    icon: MessageSquare,
  },
  {
    title: 'Negotiate',
    description: 'Discuss terms and requirements to reach a mutual agreement',
    icon: Handshake,
  },
  {
    title: 'Confirm Deal',
    description: 'Finalize the sponsorship agreement with clear terms',
    icon: CheckCircle2,
  },
  {
    title: 'Success',
    description: 'Complete the partnership and achieve mutual growth',
    icon: DollarSign,
  },
];

const Timeline = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our streamlined process makes it easy to connect sponsors with event organizers
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative flex items-center justify-center overflow-x-auto">
          <div className="relative flex w-full max-w-5xl items-center">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={index}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((index + 1) / timelineSteps.length) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.8 }}
                    className="absolute top-6 left-0 h-1 bg-emerald-500"
                  ></motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.8 + 0.6 }}
                    className="flex flex-col items-center text-center relative"
                  >
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20 z-10">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
