'use client'

import { motion } from 'framer-motion'
import { Bot, Zap, Code, Database, Workflow, MessageSquare, Cpu, Globe, Home, PhoneOff,GitMerge, Mic } from 'lucide-react'
import { CONTACT } from '@/utils/links'

const Services = () => {
  // const services = [
  //   {
  //     icon: Bot,
  //     title: 'Instant Missed-Call Auto-Reply',
  //     description: 'Omnichannel conversational agents that instantly engage and qualify inbound leads 24/7, booking high-intent buyers directly onto your calendar.',
  //     features: [
  //       'Never leave a prospect waiting',
  //       'Stop them from calling competitors',
  //       'Direct calendar scheduling',
  //       'SMS, Web & WhatsApp',
  //       'Seamless integration'
  //     ],
  //     color: 'bg-dev2c-text'
  //   },
  //   {
  //     icon: Zap,
  //     title: '24/7 AI Voice Assistant',
  //     description: 'Automated backend agents that ingest messy contracts, lease agreements, and disclosures, extracting critical terms and mapping them directly into your database.',
  //     features: [
  //       'Your custom AI agent',
  //       'will Answer your phone and book follow-up',
  //       'ERP / CRM auto-population',
  //       'meetings directly onto your calendar.',
  //       'Zero manual data entry'
  //     ],
  //     color: 'bg-dev2c-text'
  //   },
  //   {
  //     icon: Home,
  //     title: 'Full Pipeline Integration',
  //     description: 'Proactive agents that continuously monitor live MLS feeds, curate exact matches based on buyer criteria, and autonomously coordinate showing schedules.',
  //     features: [
  //       'We build complete systems',
  //       'Hyper-personalized property curation',
  //       'integrate AI agents',
  //       'CRM and sales pipeline so your lead data is always synced and organized',
  //       'End-to-end scheduling workflows'
  //     ],
  //     color: 'bg-dev2c-text'
  //   }
  // ]
const services = [
  {
    icon: PhoneOff, // More specific icon  missed CALL
    title: 'Instant Missed-Call Auto-Reply',
    description:
      'Miss a call and you risk losing the lead to the next agent they dial. Our system fires an instant SMS the moment a call goes unanswered re-engaging the prospect before they move on.',
    features: [
      'Never leave a prospect waiting',
      'Stop them from calling competitors',
      'Instant SMS & WhatsApp auto-reply',
      '24/7 automated re-engagement',
      'Book appointments on autopilot',
    ],
    color: 'bg-dev2c-text',
  },
  {
    icon: Mic, 
    title: '24/7 AI Voice Assistant',
    description:
      'Busy at a showing? Your custom AI agent answers every inbound call, handles property FAQs, qualifies the lead, and books follow-up meetings directly onto your calendar without you lifting a finger.',
    features: [
      'Answers calls when you\'re unavailable',
      'Qualifies leads in real time',
      'Books meetings to your calendar',
      'Handles property inquiries & FAQs',
      'Works around the clock, every day',
    ],
    color: 'bg-dev2c-text',
  },
  {
    icon: GitMerge, // More specific icon  PIPELINE / integration
    title: 'Full Pipeline Integration',
    description:
      'We don\'t hand you a tool and walk away. We wire every AI agent directly into your existing CRM and sales pipeline — so every lead, note, and follow-up is automatically synced, organized, and ready to close.',
    features: [
      'Connects to your existing CRM',
      'Auto-syncs all lead data & activity',
      'Zero manual data entry',
      'End-to-end pipeline visibility',
      'Built around your current workflow',
    ],
    color: 'bg-dev2c-text',
  },
]
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="services" className="py-32 lg:py-40 px-8 lg:px-16 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-dev2c-text">
            Our <span className="text-dev2c-textmuted">Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-dev2c-textmuted max-w-3xl mx-auto font-light tracking-wide">
            Direct access to the founders. No account managers, just world-class engineering tailored for Real Estate.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative"
            >
              {/* Prestige Glass Card */}
              <div className="card h-full overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:border-dev2c-text/20 transition-all duration-1000 relative z-10 group-hover:bg-white/40 hover:scale-[1.2] transition-transform duration-1000 ease-in-out">
                <div className="flex items-center mb-8">
                  <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mr-5 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-1000 ease-in-out`}>
                    <service.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-semibold text-dev2c-text tracking-tight">
                    {service.title}
                  </h3>
                </div>

                <p className="text-dev2c-textmuted mb-8 leading-relaxed font-light text-base">
                  {service.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest font-semibold text-dev2c-text mb-4 opacity-80">Key Features</h4>
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-dev2c-text/60 group-hover:bg-dev2c-text transition-colors duration-300"></div>
                      <span className="text-sm text-dev2c-textmuted font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-dev2c-text tracking-tight">
              Technologies We <span className="text-dev2c-textmuted font-light">Master</span>
            </h3>
            <p className="text-lg text-dev2c-textmuted font-light tracking-wide">
              Built with cutting-edge tools and frameworks for maximum performance and reliability
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-10">
            {[
              { name: 'Ollama', icon: Cpu },
              { name: 'n8n', icon: Workflow },
              { name: 'FastAPI', icon: Code },
              { name: 'Next.js', icon: Globe },
              { name: 'LangChain', icon: Bot },
              { name: 'Pinecone', icon: Database },
              { name: 'Web Speech', icon: MessageSquare },
              { name: 'Tailwind', icon: Zap }
            ].map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.05 }}
                className="glass-effect flex flex-col items-center justify-center p-5 hover:bg-white/40 hover:border-dev2c-text/20 transition-all duration-300 group"
              >
                <tech.icon className="w-7 h-7 text-dev2c-textmuted group-hover:text-dev2c-text mb-3 transition-colors duration-300" strokeWidth={1.5} />
                <span className="text-xs font-semibold text-dev2c-text tracking-widest uppercase text-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-dev2c-text rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Let's discuss how AI agents and automation can streamline your operations and boost productivity.
            </p>
            <a
              href={CONTACT.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-dev2c-textmuted font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-md"
            >
              Book Free Consultancy Call
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 