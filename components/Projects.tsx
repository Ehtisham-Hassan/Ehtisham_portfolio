'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Bot, Zap, Database, MessageSquare, TrendingUp, Users } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'Voice-Enabled Customer Support Agent',
      description: 'Built an intelligent customer support chatbot with voice capabilities using Ollama and Web Speech API. Handles 500+ daily inquiries with 95% satisfaction rate.',
      tools: ['Ollama', 'Web Speech API', 'FastAPI', 'n8n'],
      outcome: 'Reduced support tickets by 60% and improved response time to under 30 seconds.',
      image: '/api/placeholder/400/250',
      demo: '#',
      github: '#',
      category: 'AI Agent'
    },
    {
      title: 'Automated Lead Management System',
      description: 'Developed a comprehensive lead management workflow using n8n that automatically captures, qualifies, and routes leads to the appropriate sales team.',
      tools: ['n8n', 'Google Sheets', 'Gmail API', 'Calendly'],
      outcome: 'Increased lead conversion rate by 40% and reduced manual follow-up time by 80%.',
      image: '/api/placeholder/400/250',
      demo: '#',
      github: '#',
      category: 'Automation'
    },
    {
      title: 'Intelligent Document Processing Bot',
      description: 'Created an AI-powered document processing system that extracts, analyzes, and categorizes information from various document types using LangChain and Pinecone.',
      tools: ['LangChain', 'Pinecone', 'FastAPI', 'React'],
      outcome: 'Processed 10,000+ documents with 98% accuracy, saving 20 hours of manual work weekly.',
      image: '/api/placeholder/400/250',
      demo: '#',
      github: '#',
      category: 'AI Agent'
    },
    {
      title: 'Real-time Analytics Dashboard',
      description: 'Built a real-time analytics platform that aggregates data from multiple sources and provides actionable insights through automated reporting.',
      tools: ['Next.js', 'WebSocket', 'Chart.js', 'n8n'],
      outcome: 'Provided real-time visibility into business metrics, enabling data-driven decisions.',
      image: '/api/placeholder/400/250',
      demo: '#',
      github: '#',
      category: 'Analytics'
    },
    {
      title: 'Multi-language Chatbot',
      description: 'Developed a multilingual customer service chatbot supporting English, Spanish, and French with seamless language detection and response.',
      tools: ['Ollama', 'Translation API', 'Web Speech API', 'FastAPI'],
      outcome: 'Expanded customer reach by 300% and improved international customer satisfaction.',
      image: '/api/placeholder/400/250',
      demo: '#',
      github: '#',
      category: 'AI Agent'
    },
    {
      title: 'Automated Content Management',
      description: 'Created an automated content management system that schedules, publishes, and analyzes social media content across multiple platforms.',
      tools: ['n8n', 'Social APIs', 'Analytics API', 'Node.js'],
      outcome: 'Increased social media engagement by 150% and reduced content management time by 70%.',
      image: '/api/placeholder/400/250',
      demo: '#',
      github: '#',
      category: 'Automation'
    }
  ]

  const categories = ['All', 'AI Agent', 'Automation', 'Analytics']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-dev2c-text">
            Featured <span className="text-dev2c-textmuted">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-world solutions that demonstrate the power of AI agents and automation. 
            Each project delivers measurable results and business value.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group"
            >
              <div className="card h-full hover:scale-105 transition-transform duration-300">
                {/* Project Image */}
                <div className="relative mb-6 overflow-hidden rounded-lg">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        {project.category === 'AI Agent' && <Bot className="w-8 h-8 text-white" />}
                        {project.category === 'Automation' && <Zap className="w-8 h-8 text-white" />}
                        {project.category === 'Analytics' && <TrendingUp className="w-8 h-8 text-white" />}
                      </div>
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Overlay with links */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <a
                      href={project.demo}
                      className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
                      title="View Demo"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-700" />
                    </a>
                    <a
                      href={project.github}
                      className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
                      title="View Code"
                    >
                      <Github className="w-5 h-5 text-gray-700" />
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>

                  {/* Tools Used */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 rounded"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-green-800 dark:text-green-400 mb-1">
                      🎯 Outcome:
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {project.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Projects Completed', value: '50+', icon: TrendingUp },
              { label: 'Happy Clients', value: '25+', icon: Users },
              { label: 'AI Agents Built', value: '30+', icon: Bot },
              { label: 'Automation Workflows', value: '100+', icon: Zap }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects 