'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  MessageCircle, 
  Calendar, 
  Eye, 
  Bot, 
  Zap, 
  Code, 
  Database,
  Github,
  Linkedin,
  Mail,
  Download,
  ChevronDown,
  Play,
  Pause
} from 'lucide-react'
import VoiceChatbot from '@/components/VoiceChatbot'
import Navbar from '@/components/Navbar'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Contact from '@/components/Contact'
import toast from 'react-hot-toast'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleBookCall = () => {
    // In a real implementation, this would open Calendly or similar
    toast.success('Booking system coming soon!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">I Build Custom AI Agents</span>
              <br />
              <span className="text-gray-800 dark:text-gray-200">
                & Automation Workflows That Work
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your business with intelligent automation powered by local AI agents, 
              voice interfaces, and seamless workflow integration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={() => scrollToSection('voice-chatbot')}
                className="btn-primary flex items-center gap-2 group"
              >
                <Mic className="w-5 h-5 group-hover:animate-pulse" />
                🎙️ Talk to My Agent
              </button>
              
              <button 
                onClick={handleBookCall}
                className="btn-secondary flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                📅 Book Free Consultancy
              </button>
              
              <button 
                onClick={() => scrollToSection('projects')}
                className="btn-secondary flex items-center gap-2"
              >
                <Eye className="w-5 h-5" />
                👀 See My Work
              </button>
            </div>
            
            {/* Tech Stack Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['Ollama', 'n8n', 'Web Speech API', 'FastAPI', 'Next.js', 'Tailwind'].map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <button 
              onClick={() => scrollToSection('voice-chatbot')}
              className="animate-bounce-slow p-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300"
            >
              <ChevronDown className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Voice Chatbot Section */}
      <section id="voice-chatbot" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Experience My <span className="gradient-text">Voice AI Agent</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powered by Ollama running locally on my server. Ask me about AI agents, 
              automation workflows, or my services!
            </p>
          </motion.div>
          
          <VoiceChatbot />
        </div>
      </section>

      {/* Services Section */}
      <Services />

      {/* Projects Section */}
      <Projects />

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />
    </div>
  )
} 