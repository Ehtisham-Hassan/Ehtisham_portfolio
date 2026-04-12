'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CONTACT } from '@/utils/links'
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
    window.open(CONTACT.calendly, '_blank')
  }

  return (
    <div className="min-h-screen bg-dev2c-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-8 sm:px-12 lg:px-16 bg-dev2c-bg">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* Left Column (Text) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left"
          >
            {/* <span className="text-sm font-semibold text-dev2c-textmuted mb-6 uppercase tracking-wider">
              Welcome to Dev2c
            </span> */}
            {/* <h2>Disciplined</h2> */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-14 tracking-tight text-dev2c-text leading-[1.1]">
              Scale Your <span className="text-[#1B4332]">Real Estate</span> Empire with <span className="text-[#1B4332]">AI Precision</span>
            </h1>

            <p className="text-lg sm:text-xl text-dev2c-textmuted mb-16 max-w-2xl leading-relaxed">
              We build custom AI Agents that handle lead qualification, follow-ups, and scheduling so your team can focus on closing million-dollar deals.
            </p>

            <button
              onClick={handleBookCall}
              className="bg-dev2c-text text-white font-medium py-4 px-8 rounded-full hover:bg-dev2c-text/90 transition-colors duration-300 shadow-md"
            >
              Get Your Custom AI Audit
            </button>
          </motion.div>

          {/* Right Column (Bento Grid) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-8 lg:gap-12 h-full"
          >
            {/* Top Left (Ehtisham) */}
            <div className="col-span-1 aspect-square md:aspect-[4/5] bg-dev2c-header rounded-lg overflow-hidden relative shadow-lg border border-dev2c-text/10 group">
              <Image src="/images/ehtisham.png" alt="Ehtisham" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                <a href={`mailto:${CONTACT.ehtisham.email}`} className="p-3 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-xl transition-colors duration-200" title="Email">
                  <Mail className="w-6 h-6" />
                </a>
                <a href={CONTACT.ehtisham.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-xl transition-colors duration-200" title="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href={CONTACT.ehtisham.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-xl transition-colors duration-200" title="GitHub">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Top Right (Tahir) */}
            <div className="col-span-1 aspect-square md:aspect-[4/5] bg-dev2c-header rounded-lg overflow-hidden relative shadow-lg border border-dev2c-text/10 group">
              <Image src="/images/tahir.png" alt="Tahir" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                <a href={`mailto:${CONTACT.tahir.email}`} className="p-3 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-xl transition-colors duration-200" title="Email">
                  <Mail className="w-6 h-6" />
                </a>
                <a href={CONTACT.tahir.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-xl transition-colors duration-200" title="LinkedIn">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href={CONTACT.tahir.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-dev2c-text/5 hover:bg-dev2c-text/10 text-dev2c-text rounded-xl transition-colors duration-200" title="GitHub">
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
                className="absolute inset-0 w-full h-full object-cover opacity-"
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
      <section id="voice-chatbot" className="py-32 lg:py-40 px-8 sm:px-12 lg:px-16 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-[#1B4332]">
              Talk to the Future of Real Estate.
            </h2>
            <p className="text-xl text-dev2c-textmuted max-w-2xl mx-auto">
              Press the mic to see how our agents handle lead inquiries in real-time. No typing required.
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