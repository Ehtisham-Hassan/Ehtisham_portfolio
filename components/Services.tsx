'use client'

import { motion } from 'framer-motion'
import { Bot, Zap, Code, Database, Workflow, MessageSquare, Cpu, Globe } from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Bot,
      title: 'Custom AI Agents',
      description: 'Intelligent chatbots and virtual assistants powered by local LLMs like Ollama. Perfect for customer support, data analysis, and task automation.',
      features: ['GPT-based agents', 'Workflow agents', 'Voice-enabled chatbots', 'Multi-modal AI'],
      color: 'bg-dev2c-text'
    },
    {
      icon: Zap,
      title: 'Workflow Automation',
      description: 'End-to-end automation solutions using n8n to streamline your business processes and eliminate repetitive tasks.',
      features: ['Slack bots', 'CRM automation', 'Notion integration', 'Email workflows'],
      color: 'bg-dev2c-text'
    },
    {
      icon: Code,
      title: 'API Solutions',
      description: 'Custom API development and integration services using modern frameworks like FastAPI and LangChain.',
      features: ['LangChain integration', 'Pinecone vector DBs', 'Custom APIs', 'Third-party integrations'],
      color: 'bg-dev2c-text'
    }
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
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
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
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I specialize in building intelligent automation solutions that transform how businesses operate. 
            From AI agents to workflow automation, I deliver results that work.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="card h-full hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mr-4`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Key Features:</h4>
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
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
            <h3 className="text-2xl font-bold mb-4 text-dev2c-text">
              Technologies We <span className="text-dev2c-textmuted">Master</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Built with cutting-edge tools and frameworks for maximum performance and reliability
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
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
                className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <tech.icon className="w-8 h-8 text-dev2c-text mb-2" />
                <span className="text-xs font-medium text-dev2c-textmuted text-center">
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
            <button className="bg-white text-dev2c-textmuted font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-md">
              Book Free Consultancy Call
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services 