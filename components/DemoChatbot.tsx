'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Send, Volume2, VolumeX, Bot, User, Loader2, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { CONTACT } from '@/utils/links'
import './MicPulse.css'


interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const DemoChatbot = () => {
  const [mounted, setMounted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  })
  const sessionId = useRef(`session-${Date.now()}`)
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi, I'm the Real Estate Demo Agent. I'm connected directly to our n8n backend. Tell me what kind of property you're looking for!",
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

  const handleStartChat = () => {
    if (!formData.name || !formData.email || !formData.city || !formData.phone) {
      toast.error('Please fill in all details to start.')
      return
    }
    setHasStarted(true)
  }

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
      const response = await fetch(CONTACT.n8nWebhookDemo, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: text.trim(),
          sessionId: sessionId.current,
          history: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          })),
          prefillName: formData.name,
          prefillEmail: formData.email,
          prefillCity: formData.city,
          prefillPhone: formData.phone,
          Timestamp: new Date().toISOString()
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to get response from n8n backend')
      }
      // // error here
      // const data = await response.json()
      // console.log(response)     
      // console.log(data.response)

      if (!response.ok) {
        throw new Error(`Failed to get response: ${response.status} ${response.statusText}`);
      }
      
      // 1. Read as raw text first to prevent the JSON crash
      const rawText = await response.text();
      
      let data;
      try {
        // 2. Only try to parse it if n8n actually sent something back
        data = rawText ? JSON.parse(rawText) : [];
      } catch (parseError) {
        console.error("JSON Parse Error. The webhook returned this instead of JSON:", rawText);
        throw new Error("Webhook did not return valid JSON");
      }

      // // 3. Extract your data (combining your previous logic)
      // const rawOutput = Array.isArray(data) && data[0]?.output 
      //   ? data[0].output 
      //   : data?.response || "Sorry, I received an unexpected response format.";
// 3. Bulletproof data extraction
      let rawOutput = "";

      if (typeof data === 'string') {
        // Handle case where n8n returns a raw string instead of JSON
        rawOutput = data;
      } else if (Array.isArray(data) && data.length > 0) {
        // Handle array format: [{ output: "..." }]
        rawOutput = data[0]?.output || data[0]?.response || data[0]?.text || data[0]?.message || JSON.stringify(data[0]);
      } else if (data && typeof data === 'object') {
        // Handle object format: { output: "..." }
        rawOutput = data.output || data.response || data.text || data.message || JSON.stringify(data);
      } else if (rawText) {
        // Ultimate fallback: just print whatever the server sent
        rawOutput = rawText;
      } else {
        rawOutput = "The webhook returned a completely empty response.";
      }

      let cleanText = rawOutput;
      let agentData = null;
      
      // 4. Parse your hidden AGENT_RESPONSE tag
      const match = rawOutput.match(/<AGENT_RESPONSE>(.*?)<\/AGENT_RESPONSE>/);
      if (match && match[1]) {
        try {
          agentData = JSON.parse(match[1]);
          cleanText = rawOutput.replace(match[0], '').trim();
        } catch (error) {
          console.error("Failed to parse the AGENT_RESPONSE JSON", error);
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: cleanText,
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])

      // const botMessage: Message = {
      //   id: (Date.now() + 1).toString(),
      //   text: data.response || data[0].output || data.output || "No response field found in the webhook output.",
      //   sender: 'bot',
      //   timestamp: new Date()
      // }
      
      // setMessages(prev => [...prev, botMessage])
      
      // Speak the response if not muted
      if (!isMuted && synthesisRef.current) {
        speakText(botMessage.text)
      }
      
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Connection failed. Make sure the n8n workflow is active.')
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting to the n8n backend. Please ensure the webhook is active.",
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
      if (!hasStarted) {
        handleStartChat()
      } else {
        handleSendMessage(inputText)
      }
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

  // Helper: render markdown-style formatting into React elements
  const renderFormattedText = (text: string) => {
    // Split the text by newline to handle line breaks
    const lines = text.split('\n')

    return lines.map((line, lineIndex) => {
      const trimmedLine = line.trim()

      // Skip completely empty lines but add a spacer
      if (trimmedLine === '') {
        return <div key={lineIndex} className="h-2" />
      }

      // Detect numbered list items like "1. **Title**"
      const listMatch = trimmedLine.match(/^(\d+)\.\s+(.*)/)
      const isListItem = !!listMatch

      // Process inline bold (**text**)
      const renderInline = (str: string) => {
        const parts = str.split(/(\*\*.*?\*\*)/g)
        return parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} className="font-semibold text-[#E5E5E5]">
                {part.slice(2, -2)}
              </strong>
            )
          }
          return <span key={i}>{part}</span>
        })
      }

      if (isListItem) {
        return (
          <div
            key={lineIndex}
            className="flex items-start gap-2 py-1.5 pl-1"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#183C2D]/60 text-[#DDDBD8] text-xs font-semibold flex items-center justify-center mt-0.5">
              {listMatch![1]}
            </span>
            <span className="flex-1">{renderInline(listMatch![2])}</span>
          </div>
        )
      }

      return (
        <p key={lineIndex} className="py-0.5">
          {renderInline(trimmedLine)}
        </p>
      )
    })
  }

  return (
    <div className="max-w-4xl mx-auto relative group hover:scale-[1.02] transition-transform duration-1000 ease-in-out">
      
      <div className="absolute -inset-1 bg-[#183C2D] rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

      <div className="relative bg-[#12181A] backdrop-blur-xl rounded-[2rem] border border-[#DDDBD8]/10 p-5 sm:p-8 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
      
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#DDDBD8]/10 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#183C2D] rounded-full flex items-center justify-center shadow-lg shadow-[#183C2D]/30">
              <Bot className="w-6 h-6 text-[#DDDBD8]" />
            </div>
            <div>
              <h3 className="font-semibold text-xl text-[#E5E5E5] tracking-wide">Live Demo Agent</h3>
              <p className="text-sm text-[#DDDBD8]/50 font-light mt-1 hidden sm:block">
                Connected to n8n webhook: {CONTACT.n8nWebhookDemo}
              </p>
            </div>
          </div>
          
          {hasStarted && (
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
          )}
        </div>

        {!hasStarted ? (
          // Pre-fill Form Area
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full"
          >
            <div className="text-center mb-8">
              <h4 className="text-2xl text-[#E5E5E5] font-semibold mb-2">Welcome! Let's prep the agent.</h4>
              <p className="text-sm text-[#DDDBD8]/60 font-light">
                Please provide some pre-filled context so the AI can simulate checking real estate listings for you.
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-5 py-4 border border-[#DDDBD8]/10 rounded-xl focus:ring-1 focus:ring-[#DDDBD8] focus:border-[#DDDBD8] bg-[#DDDBD8]/5 text-[#E5E5E5] placeholder-[#DDDBD8]/40 font-light transition-all outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-5 py-4 border border-[#DDDBD8]/10 rounded-xl focus:ring-1 focus:ring-[#DDDBD8] focus:border-[#DDDBD8] bg-[#DDDBD8]/5 text-[#E5E5E5] placeholder-[#DDDBD8]/40 font-light transition-all outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                onKeyPress={handleKeyPress}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-5 py-4 border border-[#DDDBD8]/10 rounded-xl focus:ring-1 focus:ring-[#DDDBD8] focus:border-[#DDDBD8] bg-[#DDDBD8]/5 text-[#E5E5E5] placeholder-[#DDDBD8]/40 font-light transition-all outline-none"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                onKeyPress={handleKeyPress}
              />
              <input
                type="text"
                placeholder="Target City"
                className="w-full px-5 py-4 border border-[#DDDBD8]/10 rounded-xl focus:ring-1 focus:ring-[#DDDBD8] focus:border-[#DDDBD8] bg-[#DDDBD8]/5 text-[#E5E5E5] placeholder-[#DDDBD8]/40 font-light transition-all outline-none"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                onKeyPress={handleKeyPress}
              />
              
              <button
                onClick={handleStartChat}
                className="w-full py-4 mt-6 bg-[#183C2D] text-[#E5E5E5] rounded-xl font-medium shadow-lg hover:bg-[#123524] transition-all flex items-center justify-center gap-2 group"
              >
                Start AI Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ) : (
          // Chat Area
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col"
          >
            {/* Hero Area - The Custom CSS Mic Area */}
            <div className="ai-mic-container w-full !p-4 !bg-transparent mb-2">
              <button 
                className="premium-mic-btn" 
                onClick={toggleListening}
                aria-label={isListening ? "Stop listening" : "Start listening"}
              >
                {!isListening && <div className="mic-pulse-ring"></div>}
                {isListening ? <WaveformIcon /> : <Mic className="mic-icon" />}
              </button>

              <p className="mic-instruction-text text-sm">
                {isListening ? 'LISTENING TO YOUR REQUEST...' : 'PRESS MIC TO SPEAK'}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4 custom-scrollbar min-h-[200px]">
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
                          <div className="text-[15px] leading-relaxed font-light chat-formatted">
                            {renderFormattedText(message.text)}
                          </div>
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
                      <span className="text-sm font-light text-[#DDDBD8]/60">Agent is typing...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Floating Example Tags */}
            <div className="flex flex-wrap gap-2 md:gap-4 mb-4 justify-center">
              {[
                `I want to buy a home in ${formData.city}, budget 500K`,
                "Can you book a viewing for me?",
                "What's available around 800K?"
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
            <div className="flex items-center gap-3 mt-auto">
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
          </motion.div>
        )}

      </div>
      
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

export default DemoChatbot
