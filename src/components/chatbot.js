'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiMessageCircle, FiX, FiMinimize2, FiMaximize2 } from 'react-icons/fi'
import { BsRobot, BsPerson } from 'react-icons/bs'
import { useTheme } from '../context/ThemeContext'

const defaultMessages = [
  {
    from: 'bot',
    text: 'Hi there! 👋 I\'m your virtual assistant. Ask me anything about my work, skills, or how we can collaborate!',
  },
]

const suggestions = [
  'Who are you?',
  'What services do you offer?',
  'What are your skills?',
  'What\'s your philosophy?',
  'Can we collaborate?',
  'Show me your work',
  'How do I contact you?',
  'What does E_sai_Art mean?',
]

const typingReplies = [
  'Let me think about that...',
  'Processing your question...',
  'Finding the best answer...',
  'Just a moment...',
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(defaultMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [typingText, setTypingText] = useState('')
  const recognitionRef = useRef(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { darkMode } = useTheme()

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }
  
  const toggleMinimize = () => setIsMinimized(!isMinimized)

  // Rotate typing messages
  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setTypingText(typingReplies[Math.floor(Math.random() * typingReplies.length)])
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isTyping])

  // ⏱️ Auto-open chat after 7 seconds with animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 7000)
    return () => clearTimeout(timer)
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // 🧠 Bot reply logic
  const getBotReply = (lower) => {
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return 'Hey! 👋 I\'m here to help you explore Samuel\'s work. What would you like to know?'
    } else if (lower.includes('who are you') || lower.includes('tell me about yourself')) {
      return `I'm Idaewor S.E Providence — a creative technologist and artist. I blend code and creativity to build functional and imaginative solutions.`
    } else if (lower.includes('what services') || lower.includes('offer') || lower.includes('do you do')) {
      return `I offer services including:\n\n• 🎨 Book Covers & Illustrations\n• 📚 Comics & Graphic Novels\n• 🖌️ 3D Modeling & Product Design\n• 🎬 Audio, Video & Image Editing\n• 💻 Frontend/Backend Development\n• 📱 Mobile Apps & Web Design\n• 🎞️ Video Editing & Animation`
    } else if (lower.includes('what are your skills') || lower.includes('skills') || lower.includes('expertise')) {
      return `**Soft Skills:**\n✨ Honesty | 🤝 Teamwork | 🎨 Creativity | 🧠 Cognitive Thinking\n\n**Hard Skills (in development):**\n🔗 Web3 | 🤖 AI Development | 🎮 Game Development`
    } else if (lower.includes('philosophy') || lower.includes('belief')) {
      return `Curiosity is my superpower. I believe both art and technology are tools for transformation — they connect, inspire, and empower. ✨`
    } else if (lower.includes('collaborate') || lower.includes('can we collaborate') || lower.includes('work together')) {
      return `Absolutely! I love creative collaborations — whether it's art, tech, or educational projects. Let's make something meaningful together! 🤝`
    } else if (
      lower.includes('show me your work') ||
      lower.includes('portfolio') ||
      lower.includes('project')
    ) {
      return `You can view my work in these sections:\n\n🖥️ **Technical Portfolio:** Websites & Apps\n🎨 **Artistic Portfolio:** 2D & 3D Art\n🖼️ **Graphic Gallery:** Design Projects\n\nClose the chat and explore above!`
    } else if (
      lower.includes('contact') ||
      lower.includes('how do i contact you') ||
      lower.includes('reach you') ||
      lower.includes('email')
    ) {
      return `You can reach me here:\n\n📧 Email: idaeworsamuelprovidence@gmail.com\n📞 Call: +234 811 782 0918\n📱 WhatsApp: +234 810 866 6501\n\nOr use the contact form on my site!`
    } else if (lower.includes('e_sai_art') || lower.includes('what does e_sai_art mean') || lower.includes('skywalker')) {
      return `E_sai_Art (The Skywalker) is my artistic alias — it represents a journey of storytelling, personal growth, and creative reinvention. ✨`
    } else if (lower.includes('thank') || lower.includes('thanks')) {
      return `You're welcome! 😊 Feel free to ask anything else.`
    } else if (lower.includes('bye') || lower.includes('goodbye') || lower.includes('see you')) {
      return `Goodbye! 👋 Feel free to come back anytime. Have a great day!`
    }
    return `Hmm... I'm not sure about that yet. You can ask me about:\n\n👤 Who I am\n🛠️ My services\n💡 Skills & expertise\n📂 Portfolio\n📞 Contact info\n🤝 Collaboration`
  }

  // 💬 Send message
  const handleSend = (textOverride = null) => {
    const finalInput = textOverride || input.trim()
    if (!finalInput) return

    const userMessage = { from: 'user', text: finalInput }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    const lower = finalInput.toLowerCase()
    const reply = getBotReply(lower)

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: reply }])
      setIsTyping(false)
    }, 1500)
  }

  // 🎤 Voice input
  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is only supported in Chrome browser')
      return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      // Visual feedback could be added here
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      handleSend(transcript)
    }

    recognition.onerror = (event) => {
      console.error('Speech error', event.error)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {/* Toggle Button */}
        <motion.button
          key="toggle-button"
          onClick={toggleChat}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`flex items-center gap-2 p-4 rounded-full shadow-2xl transition-all duration-300 ${
            darkMode
              ? 'bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700'
              : 'bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600'
          } text-white`}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
        </motion.button>

        {/* Chat Window */}
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`absolute bottom-20 right-0 w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${
              darkMode
                ? 'bg-slate-800/95 backdrop-blur-xl border-slate-700'
                : 'bg-white/95 backdrop-blur-xl border-blue-100'
            }`}
          >
            {!isMinimized ? (
              <>
                {/* Header with Gradient */}
                <motion.div 
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  className={`px-4 py-4 bg-gradient-to-r from-blue-600 to-blue-600 text-white`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <BsRobot size={24} />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold">E_sai Assistant</h3>
                        <div className="flex items-center gap-2 text-xs opacity-90">
                          <div className={`w-2 h-2 rounded-full ${
                            isTyping ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
                          }`} />
                          <span>{isTyping ? 'Thinking...' : 'Online'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMinimize}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <FiMinimize2 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleChat}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <FiX size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Messages Area */}
                <div 
                  className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: darkMode ? '#475569 #1e293b' : '#cbd5e1 #f1f5f9',
                  }}
                >
                  <AnimatePresence>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: msg.from === 'user' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.from === 'bot' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-600 flex items-center justify-center text-white text-sm shrink-0">
                            <BsRobot size={14} />
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-wrap shadow-md ${
                            msg.from === 'user'
                              ? darkMode
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-blue-500 text-white rounded-br-none'
                              : darkMode
                                ? 'bg-slate-700 text-gray-200 rounded-bl-none'
                                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                        {msg.from === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-600 flex items-center justify-center text-white text-sm shrink-0">
                            <BsPerson size={14} />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start gap-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-600 flex items-center justify-center text-white">
                        <BsRobot size={14} />
                      </div>
                      <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-2xl rounded-bl-none">
                        <div className="flex gap-1 items-center mb-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                          {typingText}
                        </p>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                <div className="px-4 py-3 border-t dark:border-slate-700">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Quick suggestions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSend(s)}
                        className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                          darkMode
                            ? 'bg-slate-700 hover:bg-slate-600 text-gray-200'
                            : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                        }`}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50">
                  <div className="flex gap-2">
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="flex-1 relative"
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          darkMode
                            ? 'bg-slate-700 text-white placeholder-gray-400 focus:ring-blue-500'
                            : 'bg-white text-gray-800 placeholder-gray-400 focus:ring-blue-400'
                        }`}
                      />
                    </motion.div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSend()}
                        disabled={!input.trim()}
                        className={`p-3 rounded-xl transition-all ${
                          darkMode
                            ? input.trim() 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-slate-700 text-gray-500 cursor-not-allowed'
                            : input.trim()
                              ? 'bg-blue-500 hover:bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <FiSend size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={startSpeechRecognition}
                        className={`p-3 rounded-xl transition-all ${
                          darkMode
                            ? 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                        }`}
                        title="Voice input (Chrome only)"
                      >
                        
                      </motion.button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Press Enter to send • Voice input available in Chrome
                  </p>
                </div>
              </>
            ) : (
              /* Minimized View */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 cursor-pointer"
                onClick={toggleMinimize}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white">
                      <BsRobot size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm dark:text-white">E_sai Assistant</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {messages.length} messages • Click to expand
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleMinimize()
                      }}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                    >
                      <FiMaximize2 size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleChat()
                      }}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                    >
                      <FiX size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#475569' : '#cbd5e1'};
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#64748b' : '#94a3b8'};
        }
      `}</style>
    </div>
  )
}