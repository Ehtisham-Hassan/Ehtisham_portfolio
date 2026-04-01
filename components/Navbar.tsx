'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Bot } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    // { name: 'Projects', id: 'projects' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dev2c-header shadow-lg border-b border-dev2c-header/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <Bot className="w-8 h-8 text-dev2c-text" />
            <span className="text-xl font-bold text-dev2c-text tracking-widest uppercase">Dev2c</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-dev2c-text hover:opacity-70 transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden sm:block bg-dev2c-text text-white hover:bg-dev2c-text/80 font-medium py-2 px-6 rounded-full text-sm transition-all duration-300"
            >
              Book a Call
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-white/20 hover:bg-white/40 transition-colors duration-200"
            >
              {isOpen ? <X className="w-5 h-5 text-dev2c-text" /> : <Menu className="w-5 h-5 text-dev2c-text" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dev2c-bg border-t border-dev2c-text/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-dev2c-text hover:bg-dev2c-header rounded-md transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-center py-2 bg-dev2c-text text-white hover:bg-dev2c-text/80 rounded-lg transition-colors mt-4"
              >
                Book a Call
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar