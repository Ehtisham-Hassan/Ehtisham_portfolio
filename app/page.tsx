'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
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
    <div className="min-h-screen bg-dev2c-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-dev2c-bg">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column (Text) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left"
          >
            <span className="text-sm font-semibold text-dev2c-textmuted mb-6 uppercase tracking-wider">
              Welcome to Dev2c
            </span>
            <h2>Disciplined</h2>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 tracking-tight text-dev2c-text leading-tight">
              Freelancers.
            </h1>
            <p>buikding AI Agents for your business</p>

            <p className="text-lg sm:text-xl text-dev2c-textmuted mb-10 max-w-2xl leading-relaxed">
              We specialize in practical AI agents that deliver real-world results, measurable and undeniable.
              Transform your business with intelligent automation powered by local AI agents and seamless workflow integration.
            </p>

            <button
              onClick={handleBookCall}
              className="bg-dev2c-text text-white font-medium py-4 px-8 rounded-full hover:bg-dev2c-text/90 transition-colors duration-300 shadow-md"
            >
              Book a Call
            </button>
          </motion.div>

          {/* Right Column (Bento Grid) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 h-full"
          >
            {/* Top Left (Ehtisham) */}
            <div className="col-span-1 aspect-square md:aspect-[4/5] bg-dev2c-header rounded-lg overflow-hidden relative shadow-lg border border-dev2c-text/10 group">
              <Image src="/images/ehtisham.png" alt="Ehtisham" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                <a href="mailto:ehtisham@dev2c.com" className="p-3 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-xl transition-colors duration-200" title="Email">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/ehtisham" target="_blank" rel="noopener noreferrer" className="p-3 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-xl transition-colors duration-200" title="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://github.com/ehtisham" target="_blank" rel="noopener noreferrer" className="p-3 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-xl transition-colors duration-200" title="GitHub">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Top Right (Tahir) */}
            <div className="col-span-1 aspect-square md:aspect-[4/5] bg-dev2c-header rounded-lg overflow-hidden relative shadow-lg border border-dev2c-text/10 group">
              <Image src="/images/tahir.png" alt="Tahir" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                <a href="mailto:tahir@dev2c.com" className="p-3 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-xl transition-colors duration-200" title="Email">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/tahir" target="_blank" rel="noopener noreferrer" className="p-3 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-xl transition-colors duration-200" title="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://github.com/tahir" target="_blank" rel="noopener noreferrer" className="p-3 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-xl transition-colors duration-200" title="GitHub">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="col-span-2 aspect-[3/1] rounded-lg overflow-hidden relative shadow-lg bg-dev2c-text border border-dev2c-text/10">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              >
                <source src="/video/landing.mp4" type="video/mp4" />
              </video>
              {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="px-6 py-3 bg-black/40 backdrop-blur-md rounded-lg border border-dev2c-textmuted/50 text-white font-medium shadow-lg">
                  Discover our custom-built AI agents in action
                </div>
              </div> */}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Voice Chatbot Section */}
      <section id="voice-chatbot" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-dev2c-text">
              Experience Our <span className="text-dev2c-textmuted">Voice AI Agent</span>
            </h2>
            <p className="text-xl text-dev2c-textmuted max-w-2xl mx-auto">
              Powered by Ollama running locally on our server. Ask me about AI agents,
              automation workflows, or our services!
            </p>
          </motion.div>

          <VoiceChatbot />
        </div>
      </section>

      {/* Services Section */}
      <Services />

      {/* Projects Section */}
      {/* <Projects /> */}

      {/* About Section */}
      {/* <About /> */}

      {/* Contact Section */}
      <Contact />
    </div>
  )
} 