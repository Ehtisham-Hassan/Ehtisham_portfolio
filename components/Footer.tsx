'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONTACT } from '@/utils/links'
import { Github, Linkedin, Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      toast.success('Message sent successfully! I\'ll get back to you soon.')

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      })
      
      // Reset submitted state after a few seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer id="contact-footer" className="bg-dev2c-footer text-white pt-20 pb-8 px-4 sm:px-6 lg:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          
          {/* Left Column - Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <img 
                 src="/images/dev2c-mark.svg" 
                 alt="Dev2c" 
                 className="h-10 w-auto opacity-90" 
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Building AI that powers your business.
            </h3>
            <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
              We specialize in custom AI agents, n8n automation workflows, and voice-enabled solutions designed to scale your operations.
            </p>
            
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a href={`mailto:${CONTACT.tahir.email}`} className="hover:text-white transition-colors">
                  {CONTACT.tahir.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <a href="tel:+923075804316" className="hover:text-white transition-colors">
                  +92 307 580 4316
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>Remote / Worldwide</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-6">Let's work together</h3>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center h-full"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h4 className="text-xl font-medium mb-2">Message Received</h4>
                <p className="text-gray-400">We'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 focus:border-transparent outline-none text-white placeholder-gray-500 resize-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-white text-black font-semibold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-200 transition-colors shadow-md ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Dev2c. All rights reserved.
          </p>
          <div className="flex space-x-6">
             <a href={`mailto:${CONTACT.tahir.email}`} className="text-gray-500 hover:text-white transition-colors duration-200" title="Email">
               <Mail className="w-5 h-5" />
             </a>
             <a href={CONTACT.tahir.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-200" title="LinkedIn">
               <Linkedin className="w-5 h-5" />
             </a>
             <a href={CONTACT.tahir.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-200" title="GitHub">
               <Github className="w-5 h-5" />
             </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
