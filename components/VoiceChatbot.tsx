'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Send, Volume2, VolumeX, Bot, User, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

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
      text: "Hi! I'm Ehtisham's AI assistant. I can help you learn about AI agents, automation workflows, and his services. Try asking me something or use the microphone to speak!",
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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
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
      // System prompt for the AI agent
      const systemPrompt = `You are Ehtisham's AI assistant on his portfolio website. You help visitors learn about his services and expertise only you donot tell.about other you responce should be around 50 words MAx.

Key Information about Ehtisham:
- AI Agent Developer and Automation Expert
- Specializes in custom AI agents, workflow automation, and voice interfaces
- Uses technologies like Ollama, n8n, FastAPI, Next.js, and Web Speech API
- Offers services in AI agent development, workflow automation, and API solutions
- Provides free consultancy calls for potential clients

Your role:
- Answer questions about Ehtisham's services and expertise Only
- Help visitors understand AI agents and automation
- Be helpful, professional, and concise
- Encourage booking a free consultancy call if someone shows interest
- Keep responses under 50 words unless more detail is specifically requested

Always be friendly and professional. If someone asks about booking a call or shows interest in services, mention the free consultancy option.`

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">AI Assistant</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Powered by Hugging Face • Llama 3.1
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isMuted 
                  ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <Bot className="w-4 h-4 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.text}</p>
                      {mounted && (
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                    {message.sender === 'user' && (
                      <User className="w-4 h-4 text-white mt-1 flex-shrink-0" />
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
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">AI is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or use the microphone..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              rows={1}
              disabled={isLoading}
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListening}
            disabled={isLoading}
            className={`p-3 rounded-lg transition-all duration-200 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || isLoading}
            className={`p-3 rounded-lg transition-all duration-200 ${
              inputText.trim() && !isLoading
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            title="Send message"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Status indicators */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            {isListening && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Listening...</span>
              </div>
            )}
            {isSpeaking && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Speaking...</span>
              </div>
            )}
            {isMuted && (
              <div className="flex items-center space-x-1">
                <VolumeX className="w-3 h-3" />
                <span>Muted</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <span>Powered by Hugging Face</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceChatbot 