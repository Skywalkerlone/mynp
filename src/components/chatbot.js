'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiMessageCircle, FiX, FiMinimize2, FiMaximize2 } from 'react-icons/fi'
import { BsRobot, BsPerson } from 'react-icons/bs'
import { useTheme } from '../context/ThemeContext'

// Mock Gemini AI response data - 5 responses each, no emojis
const geminiMockData = {
  greetings: {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'sup', 'howdy'],
    responses: [
      'Hey there! Welcome to my creative space. How can I assist you today?',
      'Hello! Great to see you here. What would you like to explore?',
      'Hi! I am here to help you learn more about my work and services.',
      'Greetings! I am Sam, your virtual assistant. What brings you here today?',
      'Welcome! I am delighted to chat with you. How can I help?'
    ]
  },
  about: {
    patterns: ['who are you', 'tell me about yourself', 'introduce yourself', 'about you', 'your background', 'your story', 'who is samuel', 'who is idaewor', 'about samuel'],
    responses: [
      "I am Idaewor S.E Providence — a creative technologist, digital artist, and educator. I blend code, creativity, and teaching to build meaningful solutions. With over 10 years of experience, I have worked across web development, AI, 3D design, and education.",
      "I am a multidisciplinary creator passionate about using technology and art to transform ideas into reality. My work spans digital art, web development, AI education, and creative design.",
      "I am Samuel, a creative technologist who believes in the power of art and code. I have been building digital experiences and teaching technology for over a decade.",
      "I am Idaewor S.E Providence, also known as E_sai_Art. I combine my skills in design, development, and education to create meaningful work and empower others.",
      "I am a creative problem solver who works at the intersection of art, technology, and education. I help people and organizations bring their digital visions to life."
    ]
  },

  shop: {
    patterns: ['shop', 'store', 'merch', 'buy', 'purchase', 'redbubble', 'products', 'art shop', 'merchandise', 'visit shop', 'art store', 'buy art', 'shop link'],
    responses: [
      "I have an art merch shop where you can find my designs on various products! From apparel to accessories, my artwork is available on high-quality items.",
      "You can browse and purchase my art on Redbubble! I have a collection of designs available on t-shirts, hoodies, stickers, phone cases, and more. ",
      "My art merch is available online! I sell my designs on various products through Redbubble. Check out the collection here",
      "Looking for my art on products? Visit my Redbubble shop to see my designs on apparel, accessories, and home decor",
      "Support my art by purchasing merch! I have a shop on Redbubble featuring my designs on a variety of products. "
    ]
  },

  services: {
    patterns: ['services', 'offer', 'do you do', 'what can you do', 'help with', 'what services', 'your services', 'service', 'offerings', 'what do you offer'],
    responses: [
      "I offer a wide range of creative and technical services: digital art and illustrations, book covers and comics, 3D modeling and product design, video editing and animation, web development (frontend and backend), mobile app development, AI and machine learning solutions, data annotation and training, and tech education and training.",
      "My services include creative design, web and app development, AI training, and education. Whether you need a website, a mobile app, digital art, or training programs, I can help.",
      "I provide end-to-end digital solutions: from concept to deployment. This includes UI/UX design, full-stack development, 3D product visualization, video production, and technology education.",
      "I specialize in creative and technical services: digital art and illustration, web and mobile development, AI and data solutions, and educational programs for all ages.",
      "My offerings cover the full spectrum of digital creation: design, development, AI, and education. I work with individuals, businesses, and educational institutions."
    ]
  },
  skills: {
    patterns: ['skills', 'expertise', 'technologies', 'tools', 'know', 'what are your skills', 'tech stack', 'proficient in', 'capabilities', 'what do you know'],
    responses: [
      "Technical Skills: Frontend (React, Next.js, HTML/CSS, JavaScript), Backend (Node.js, Python, APIs), Design (Figma, Adobe Suite, Blender), AI/ML (AI Awareness, Machine Learning, Data Annotation), Education (Curriculum Design, Workshop Facilitation). Soft Skills: Creativity and Innovation, Team Collaboration, Critical Thinking, Communication and Teaching, Problem Solving.",
      "I bring a diverse skill set: full-stack web development, digital art and 3D modeling, AI and machine learning, curriculum design, and workshop facilitation. I am also skilled in project management and creative problem solving.",
      "My expertise includes frontend and backend development, UI/UX design, 3D modeling and animation, AI education, and data annotation. I also have strong teaching and facilitation skills.",
      "I am proficient in React, Next.js, Node.js, Python, Figma, Blender, and various AI tools. I also design and deliver educational programs on technology and digital skills.",
      "I combine technical skills in web development and AI with creative skills in design and art. I am also an experienced educator who has trained over 500 students across various programs."
    ]
  },
  philosophy: {
    patterns: ['philosophy', 'belief', 'values', 'mission', 'vision', 'what do you believe', 'your philosophy', 'core values', 'principle', 'what drives you'],
    responses: [
      "My philosophy is simple: Curiosity is a superpower. I believe both art and technology are tools for transformation — they connect, inspire, and empower. I am committed to creating meaningful work that tells stories, sharing knowledge and empowering others, using technology to solve real problems, and blending creativity with functionality.",
      "I believe that creativity and technology together can change the world. My mission is to use my skills to create impactful work and help others do the same.",
      "My values center on curiosity, creativity, and community. I believe in lifelong learning, collaborative creation, and using technology for good.",
      "I believe every project is an opportunity to learn, grow, and make a positive impact. My work is guided by a commitment to excellence, integrity, and innovation.",
      "I am driven by a belief that art and technology are powerful tools for storytelling and empowerment. My mission is to help people express themselves and solve problems through digital creation."
    ]
  },
  collaboration: {
    patterns: ['collaborate', 'work together', 'partner', 'team up', 'hire', 'collaboration', 'freelance', 'contract', 'project', 'work with you'],
    responses: [
      "I am always open to exciting collaborations! Whether you are looking for a creative partner for art projects, a developer for your web or app idea, an educator for tech training, or a consultant for AI or tech initiatives, lets connect! You can reach me at idaeworsamuelprovidence@gmail.com or call +234 811 782 0918.",
      "Collaboration is at the heart of what I do. I love working with others to bring ideas to life. Feel free to reach out if you have a project in mind.",
      "I am available for freelance work, partnerships, and educational collaborations. Lets create something meaningful together!",
      "I welcome collaboration opportunities in art, technology, and education. Whether its a creative project, a technical build, or a training program, I am interested.",
      "Lets work together! I bring creativity, technical skills, and teaching experience to every collaboration. Contact me to discuss your project."
    ]
  },
  portfolio: {
    patterns: ['portfolio', 'work', 'projects', 'show me', 'gallery', 'examples', 'your work', 'past projects', 'what have you built', 'your creations', 'samples'],
    responses: [
      "You can explore my work across different sections: Web Development (React, Next.js, full-stack projects), Digital Art (2D and 3D illustrations, character design), Graphic Design (Branding, layouts, book covers), Video and Animation (Editing, motion graphics), Education (Training programs, workshops). Check out the portfolio section above or ask me about specific projects.",
      "My portfolio showcases a diverse range of work: from web applications and mobile apps to digital art and educational materials. I also have experience with 3D product design and animation.",
      "I have worked on projects across multiple domains: creative design, web development, AI education, and content creation. You can find examples of my work in the portfolio section.",
      "My work includes commercial projects, personal art pieces, educational programs, and technical builds. I am happy to share examples based on your area of interest.",
      "I have built websites, designed products, created art, and developed training programs. Let me know what you are interested in, and I can show you relevant examples."
    ]
  },
  contact: {
    patterns: ['contact', 'reach', 'email', 'phone', 'whatsapp', 'message', 'how to contact', 'get in touch', 'reach out', 'connect with you', 'your contact'],
    responses: [
      "I would love to hear from you! Here is how you can reach me: Email: idaeworsamuelprovidence@gmail.com, Call: +234 811 782 0918, WhatsApp: +234 810 866 6501, Twitter/X: @E_sai_Art. Or use the contact form on my website. I typically respond within 24 hours.",
      "You can contact me via email, phone, or social media. I am most responsive on email and WhatsApp. Looking forward to connecting with you!",
      "Reach out to me through any of these channels: email, phone, WhatsApp, or Twitter. I am always happy to hear from potential collaborators or clients.",
      "I am available for inquiries via email, phone, or social media. Feel free to reach out with any questions or project ideas.",
      "Contact me through my website's contact form, email, or WhatsApp. I usually respond quickly and would love to discuss your project."
    ]
  },
  e_sai_art: {
    patterns: ['e_sai_art', 'skywalker', 'meaning', 'what does e_sai_art mean', 'e sai art', 'alias', 'artistic name', 'why e_sai_art', 'what is e_sai_art'],
    responses: [
      "E_sai_Art (The Skywalker) is my creative alias — it represents a journey of storytelling, personal growth, and creative reinvention. E_sai_Art embodies: artistic expression and creativity, limitless imagination (like the sky), storytelling through multiple mediums, and constant evolution and growth. It is a reflection of my belief that art and technology can take us to new heights.",
      "E_sai_Art is my artistic identity. It combines my passion for art with a sense of limitless potential. The Skywalker name represents my journey of exploration and growth.",
      "The name E_sai_Art reflects my creative philosophy: art that reaches for the sky. It symbolizes freedom, imagination, and the endless possibilities of creative expression.",
      "E_sai_Art (The Skywalker) is more than just a name — it is a commitment to creative excellence and personal growth. It represents my journey as an artist and technologist.",
      "I chose E_sai_Art as my creative alias to capture the spirit of exploration and artistic expression. The Skywalker part reminds me to always reach higher and push boundaries."
    ]
  },
  education: {
    patterns: ['education', 'teaching', 'train', 'learn', 'bootcamp', 'workshop', 'teach', 'trainer', 'instructor', 'mentor', 'students', 'classes', 'courses'],
    responses: [
      "Education is at the heart of what I do! With 10+ years of experience, I have taught: eduBRICKS (2020-Present): Coding and Robotics for ages 5-16, UpperClass AI (2023-Present): AI Awareness, ML, Web Dev, GivHerTech Africa (2024): HTML/CSS, JavaScript for women, PIP Initiative (2024): Programming awareness in schools, Edo Innovate (2025): Web dev bootcamps and kids coding. I am passionate about making tech education accessible and fun.",
      "I have extensive teaching experience across multiple programs and age groups. My approach is hands-on and practical, focusing on real-world skills and project-based learning.",
      "I design and deliver educational programs on technology, digital skills, and creative arts. I have worked with children, teenagers, adults, and professionals.",
      "Teaching is one of my greatest passions. I have developed curricula and taught coding, robotics, AI, web development, and digital art to diverse audiences.",
      "I believe in accessible education for all. My teaching experience spans bootcamps, school programs, online courses, and workshops for various age groups and skill levels."
    ]
  },
  thank_you: {
    patterns: ['thank you', 'thanks', 'appreciate', 'grateful', 'thank', 'thx', 'appreciation'],
    responses: [
      "You are welcome! It is a pleasure to help. Anything else you would like to know?",
      "Thanks for your kind words! I am here whenever you need assistance.",
      "My pleasure! Feel free to ask anything else about my work or services.",
      "I appreciate your gratitude! Let me know if I can help with anything else.",
      "Anytime! I enjoy helping people learn more about my work and how we can collaborate."
    ]
  },
  goodbye: {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'exit', 'quit', 'end', 'done', 'farewell', 'take care'],
    responses: [
      "Goodbye! It was great chatting with you. Come back anytime! Remember: Curiosity is your superpower.",
      "Take care! Feel free to reach out whenever you have questions or ideas to explore.",
      "See you later! Keep creating, keep learning, and keep pushing boundaries.",
      "Until next time! It was a pleasure connecting with you. Wishing you all the best.",
      "Farewell! I hope you found our conversation helpful. Feel free to return anytime."
    ]
  }
}

// Default welcome messages
const defaultMessages = [
  {
    from: 'bot',
    text: 'Hi there! I am your virtual assistant. Ask me anything about my work, skills, or how we can collaborate.',
  },
]

const suggestions = [
  'Who are you?',
  'What services do you offer?',
  'What are your skills?',
  'What is your philosophy?',
  'Can we collaborate?',
  'Show me your work',
  'How do I contact you?',
  'What does E_sai_Art mean?',
  'Tell me about your teaching',
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
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { darkMode } = useTheme()

  // Check speech support
  useEffect(() => {
    // Check if SpeechRecognition is available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const isSupported = !!SpeechRecognition
    setSpeechSupported(isSupported)
    
    // Log for debugging
    console.log('Speech recognition supported:', isSupported)
  }, [])

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

  // Auto-open chat after 7 seconds
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

  // Speak text with soothing male voice
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return

    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
    }

    // Clean text for speech (remove markdown symbols)
    const cleanText = text.replace(/\*\*/g, '').replace(/[•\n]/g, ' ').replace(/\s+/g, ' ').trim()
    
    const utterance = new SpeechSynthesisUtterance(cleanText)
    
    // Try to find a male voice
    const voices = window.speechSynthesis.getVoices()
    
    // Preferred male voice names (prioritize deep, soothing voices)
    const maleVoiceNames = [
      'Google UK English Male',
      'Google US English Male',
      'Microsoft David Desktop',
      'Microsoft Mark',
      'Samantha',
      'Daniel',
      'Fred',
      'Alex',
    ]
    
    // Find the best male voice
    let selectedVoice = null
    for (const name of maleVoiceNames) {
      const voice = voices.find(v => v.name.includes(name) || v.name === name)
      if (voice) {
        selectedVoice = voice
        break
      }
    }
    
    // If no preferred voice found, try to find any male-sounding voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => 
        v.name.toLowerCase().includes('male') || 
        v.name.includes('David') ||
        v.name.includes('Mark') ||
        v.name.includes('Daniel') ||
        v.name.includes('Fred')
      )
    }
    
    // Fallback: use any English voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith('en'))
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }
    
    // Soothing voice settings
    utterance.rate = 1.1
    utterance.pitch = 1.0
    utterance.volume = 1
    
    // Voice events
    utterance.onstart = () => setVoiceEnabled(true)
    utterance.onend = () => setVoiceEnabled(false)
    utterance.onerror = () => setVoiceEnabled(false)
    
    window.speechSynthesis.speak(utterance)
  }

  // Gemini AI response logic with improved matching
  const getGeminiReply = (lower) => {
    // Check each category with priority (more specific patterns first)
    const categories = Object.entries(geminiMockData)
    
    // Sort by pattern length (longer patterns are more specific)
    const sortedCategories = categories.sort((a, b) => {
      const maxLenA = Math.max(...a[1].patterns.map(p => p.length))
      const maxLenB = Math.max(...b[1].patterns.map(p => p.length))
      return maxLenB - maxLenA
    })
    
    for (const [category, data] of sortedCategories) {
      const matched = data.patterns.some(pattern => lower.includes(pattern))
      if (matched) {
        const responses = data.responses
        return responses[Math.floor(Math.random() * responses.length)]
      }
    }
    
    // Default response with suggestions
    return `I am not sure about that specific topic, but I would love to help! You can ask me about: Who I am, My services, Skills and expertise, Portfolio, Contact information, Collaboration, Education and teaching, or the meaning of E_sai_Art.`
  }

  // Send message
  const handleSend = (textOverride = null) => {
    const finalInput = textOverride || input.trim()
    if (!finalInput) return

    const userMessage = { from: 'user', text: finalInput }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    const lower = finalInput.toLowerCase()
    const reply = getGeminiReply(lower)

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: reply }])
      setIsTyping(false)
      
      // Speak the response with soothing male voice
      speakText(reply)
    }, 1500)
  }

  // Voice input - FIXED
  const startSpeechRecognition = () => {
    // Check if already listening
    if (isListening) {
      return
    }

    // Get the SpeechRecognition constructor
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      alert('Speech recognition is only supported in Chrome browser')
      return
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.lang = 'en-US'
      recognition.interimResults = true
      recognition.maxAlternatives = 1
      recognition.continuous = false

      recognition.onstart = () => {
        console.log('Speech recognition started')
        setIsListening(true)
        // Optional: show visual feedback
      }

      recognition.onresult = (event) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        // Show interim results in input
        if (interimTranscript) {
          setInput(interimTranscript)
        }

        // Process final result
        if (finalTranscript) {
          console.log('Final transcript:', finalTranscript)
          setInput(finalTranscript)
          // Send the message automatically
          handleSend(finalTranscript)
        }
      }

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        
        // Handle specific errors
        if (event.error === 'not-allowed') {
          alert('Please allow microphone access to use voice input.')
        } else if (event.error === 'no-speech') {
          // Silently handle no speech
        }
      }

      recognition.onend = () => {
        console.log('Speech recognition ended')
        setIsListening(false)
      }

      recognitionRef.current = recognition
      recognition.start()
    } catch (error) {
      console.error('Error starting speech recognition:', error)
      setIsListening(false)
      alert('There was an error starting voice input. Please try again.')
    }
  }

  // Load voices when they change
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices()
      }
    }
  }, [])

  return (
    <div className="fixed bottom-0 right-6 z-50">
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
            className={`absolute bottom-10 right-0 w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${
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
                        <h3 className="font-semibold">Sam Assistant</h3>
                        <div className="flex items-center gap-2 text-xs opacity-90">
                          <div className={`w-2 h-2 rounded-full ${
                            isTyping ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'
                          }`} />
                          <span>{isTyping ? 'Thinking...' : voiceEnabled ? 'Speaking...' : 'Online'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {voiceEnabled && (
                        <div className="flex items-center gap-1 mr-1">
                          <span className="animate-pulse text-xs">🔊</span>
                        </div>
                      )}
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
                        placeholder={isListening ? '🎤 Listening...' : 'Type your message...'}
                        className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          isListening
                            ? 'ring-2 ring-red-500'
                            : ''
                        } ${
                          darkMode
                            ? 'bg-slate-700 text-white placeholder-gray-400 focus:ring-blue-500'
                            : 'bg-white text-gray-800 placeholder-gray-400 focus:ring-blue-400'
                        }`}
                      />
                      {isListening && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <span className="flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          </span>
                        </div>
                      )}
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
                      {speechSupported && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={startSpeechRecognition}
                          disabled={isListening}
                          className={`p-3 rounded-xl transition-all ${
                            isListening
                              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                              : darkMode
                                ? 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                          }`}
                          title={isListening ? 'Listening...' : 'Voice input'}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        </motion.button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Press Enter to send • {isListening ? '🎤 Listening...' : voiceEnabled ? 'Speaking...' : speechSupported ? 'Tap mic for voice input' : 'Voice input available in Chrome'}
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
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white">
                      <BsRobot size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm dark:text-white">Sam Assistant</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {messages.length} messages • Click to expand
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {voiceEnabled && (
                      <span className="text-xs animate-pulse text-blue-500">🔊</span>
                    )}
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