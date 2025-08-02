'use client'

import { motion } from 'framer-motion'
import { Bot, Zap, Code, Database, Workflow, MessageSquare, Cpu, Globe, Download, Linkedin, Github, Mail } from 'lucide-react'

const About = () => {
  const skills = [
    { name: 'AI/ML', level: 95, icon: Bot },
    { name: 'Automation', level: 90, icon: Zap },
    { name: 'Full-Stack Dev', level: 85, icon: Code },
    { name: 'API Development', level: 90, icon: Database },
    { name: 'Workflow Design', level: 88, icon: Workflow },
    { name: 'Voice AI', level: 92, icon: MessageSquare }
  ]

  const experiences = [
    {
      year: '2023 - Present',
      title: 'AI Agent Developer & Automation Expert',
      company: 'Freelance',
      description: 'Building custom AI agents and automation workflows for clients worldwide. Specializing in Ollama, n8n, and voice-enabled solutions.'
    },
    {
      year: '2022 - 2023',
      title: 'Senior Full-Stack Developer',
      company: 'Tech Company',
      description: 'Led development of AI-powered applications and automation systems. Implemented voice interfaces and chatbot solutions.'
    },
    {
      year: '2021 - 2022',
      title: 'Automation Engineer',
      company: 'Startup',
      description: 'Designed and implemented workflow automation solutions using n8n and custom APIs. Reduced manual processes by 70%.'
    }
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I'm passionate about creating intelligent solutions that transform how businesses operate. 
            With expertise in AI agents and automation, I help companies streamline their processes and boost productivity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              My Journey
            </h3>
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <p>
                I started my journey in software development with a fascination for artificial intelligence 
                and automation. Over the years, I've specialized in building custom AI agents that can 
                understand, learn, and automate complex business processes.
              </p>
              <p>
                My expertise lies in creating intelligent solutions using cutting-edge technologies like 
                Ollama for local AI processing, n8n for workflow automation, and modern web frameworks 
                for seamless user experiences.
              </p>
              <p>
                I believe in the power of voice interfaces and natural language processing to make 
                technology more accessible and intuitive. Every project I work on is designed to 
                deliver measurable results and transform how businesses operate.
              </p>
            </div>

            {/* Experience Timeline */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Experience</h4>
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-8 border-l-2 border-primary-200 dark:border-primary-800"
                  >
                    <div className="absolute left-0 top-0 w-4 h-4 bg-primary-600 rounded-full -ml-2"></div>
                    <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                      {exp.year}
                    </div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {exp.title}
                    </h5>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {exp.company}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Skills & Expertise
            </h3>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <skill.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-primary-600 to-purple-600 h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Links */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Let's Connect
              </h4>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:ehtisham@example.com"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
                <a
                  href="https://linkedin.com/in/ehtisham"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/ehtisham"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="/resume.pdf"
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            My <span className="gradient-text">Values</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Constantly exploring new technologies and approaches to solve complex problems.',
                icon: '🚀'
              },
              {
                title: 'Quality',
                description: 'Delivering robust, scalable solutions that exceed expectations and drive results.',
                icon: '✨'
              },
              {
                title: 'Collaboration',
                description: 'Working closely with clients to understand their needs and create tailored solutions.',
                icon: '🤝'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 