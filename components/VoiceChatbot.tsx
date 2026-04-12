'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Send, Volume2, VolumeX, Bot, User, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import './MicPulse.css'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const VoiceChatbot = () => {
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi, I'm the Dev2C Concierge. I can show you how we automate lead captures and viewings. What would you like to see?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = 'en-US'
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInputText(transcript)
          handleSendMessage(transcript)
        }
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
          toast.error('Speech recognition failed. Please try again.')
        }
        
        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
      
      synthesisRef.current = window.speechSynthesis
    }
  }, [])

  // Auto-scroll to bottom of chat container
  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/ask-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim()
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to get response from AI agent')
      }
      
      const data = await response.json()
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      
      // Speak the response if not muted
      if (!isMuted && synthesisRef.current) {
        speakText(data.response)
      }
      
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to get response from AI agent. Please try again.')
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting to my AI brain right now. Please try again in a moment!",
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const speakText = (text: string) => {
    if (!synthesisRef.current || isMuted) return
    
    // Stop any current speech
    synthesisRef.current.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 0.8
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    synthesisRef.current.speak(utterance)
  }

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error('Speech recognition is not supported in your browser.')
      return
    }
    
    if (isListening) {
      recognitionRef.current.stop()
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const toggleMute = () => {
    if (isMuted && synthesisRef.current) {
      synthesisRef.current.cancel()
    }
    setIsMuted(!isMuted)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputText)
    }
  }

  const WaveformIcon = () => (
    <svg 
      className="mic-icon" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  );

  return (
    <div className="max-w-4xl mx-auto relative group hover:scale-[1.2] transition-transform duration-1000 ease-in-out">
      
      {/* Decorative gradient blur behind the luxury container */}
      {/* <div className="absolute -inset-1 bg-gradient-to-r from-[#1B4332] to-[#B8860B] rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
       */}
      <div className="absolute -inset-1 bg-[#183C2D] rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

      {/* Container Design: Glassmorphism over subtle dark gradient */}
      {/* <div className="relative bg-gradient-to-br from-[#12181A] to-[#1A1F24] backdrop-blur-xl rounded-[2rem] border border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden"> */}
      {/* Container Design */}
      <div className="relative bg-[#12181A] backdrop-blur-xl rounded-[2rem] border border-[#DDDBD8]/10 p-5 sm:p-8 shadow-2xl overflow-hidden">
      
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#DDDBD8]/10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#183C2D] rounded-full flex items-center justify-center shadow-lg shadow-[#183C2D]/30">
              <Bot className="w-6 h-6 text-[#DDDBD8]" />
            </div>
            <div>
              <h3 className="font-semibold text-xl text-[#E5E5E5] tracking-wide">AI Concierge</h3>
              <p className="text-sm text-[#DDDBD8]/50 font-light mt-1">
                Enterprise-Grade Privacy: Your business data never leaves our secure environment.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className={`p-3 rounded-xl transition-all duration-300 ${isMuted
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                  : 'bg-[#DDDBD8]/5 text-[#DDDBD8]/70 hover:bg-[#DDDBD8]/10 hover:text-[#E5E5E5] border border-[#DDDBD8]/5'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Hero Area - The Custom CSS Mic Area */}
        <div className="ai-mic-container w-full !p-6 !bg-transparent mb-2">
          <button 
            className="premium-mic-btn" 
            onClick={toggleListening}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            {/* Only show the pulse when it is waiting for the user to speak */}
            {!isListening && <div className="mic-pulse-ring"></div>}
            
            {/* Swap the icon based on the state */}
            {isListening ? <WaveformIcon /> : <Mic className="mic-icon" />}
          </button>

          <p className="mic-instruction-text">
            {isListening ? 'LISTENING TO YOUR REQUEST...' : 'PRESS MIC TO SPEAK'}
          </p>
        </div>

        {/* Messages */}
        <div className="h-48 overflow-y-auto mb-4 pr-2 space-y-4 custom-scrollbar">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] lg:max-w-[75%] px-5 py-4 rounded-3xl shadow-sm ${message.sender === 'user'
                      ? 'bg-[#183C2D] text-[#E5E5E5] rounded-br-sm'
                      : 'bg-[#DDDBD8]/5 backdrop-blur-md border border-[#DDDBD8]/10 text-[#E5E5E5] rounded-bl-sm'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {message.sender === 'bot' && (
                      <div className="w-6 h-6 bg-[#DDDBD8]/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Bot className="w-3 h-3 text-[#DDDBD8]" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-[15px] leading-relaxed font-light">{message.text}</p>
                      {mounted && (
                        <p className="text-[10px] opacity-40 mt-2 font-medium tracking-wide">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      )}
                    </div>
                    {message.sender === 'user' && (
                      <User className="w-4 h-4 text-[#DDDBD8]/50 mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-[#DDDBD8]/5 border border-[#DDDBD8]/5 px-4 py-3 rounded-3xl rounded-bl-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-[#DDDBD8]/10 rounded-full flex items-center justify-center">
                    <Loader2 className="w-3 h-3 animate-spin text-[#DDDBD8]" />
                  </div>
                  <span className="text-sm font-light text-[#DDDBD8]/60">Concierge is typing...</span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Floating Example Tags */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-4 justify-center">
          {[
            "How do you handle late-night leads?",
            "Can you book a viewing for me?",
            "Qualify a high-net-worth buyer"
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => handleSendMessage(tag)}
              className="text-xs sm:text-sm px-4 py-2 rounded-full border border-[#DDDBD8]/20 bg-[#DDDBD8]/5 hover:bg-[#DDDBD8]/10 text-[#E5E5E5] transition-all font-light tracking-wide shadow-sm"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Input Text Fallback */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Prefer typing? Send a message..."
              className="w-full px-5 py-4 border border-[#DDDBD8]/10 rounded-xl focus:ring-1 focus:ring-[#DDDBD8] focus:border-[#DDDBD8] bg-[#DDDBD8]/5 text-[#E5E5E5] placeholder-[#DDDBD8]/40 resize-none font-light transition-all"
              rows={1}
              disabled={isLoading}
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || isLoading}
            className={`p-4 rounded-xl transition-all duration-300 ${inputText.trim() && !isLoading
                ? 'bg-[#183C2D] text-[#DDDBD8] shadow-lg hover:bg-[#123524]'
                : 'bg-[#DDDBD8]/5 text-[#DDDBD8]/30 cursor-not-allowed'
            }`}
            title="Send message"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>

      </div>
      
      {/* Hidden scrollbar styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(221, 219, 216, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(221, 219, 216, 0.2);
        }
      `}} />
    </div>
  )
}

export default VoiceChatbot