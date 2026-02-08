// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { FiSend, FiMessageCircle, FiMic } from 'react-icons/fi'

// const defaultMessages = [
//   {
//     from: 'bot',
//     text: 'Hi there! 👋 I’m your virtual assistant. Ask me anything about my work, skills, or how we can collaborate or click the icon to browse through.',
//   },
// ]

// const suggestions = [
//   'Who are you?',
//   'What services do you offer?',
//   'What are your skills?',
//   'What’s your philosophy?',
//   'Can we collaborate?',
//   'Show me your work',
//   'How do I contact you?',
//   'What does E_sai_Art mean?',
// ]

// export default function Chatbot() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [messages, setMessages] = useState(defaultMessages)
//   const [input, setInput] = useState('')
//   const [isTyping, setIsTyping] = useState(false)
//   const recognitionRef = useRef(null)

//   const toggleChat = () => setIsOpen(!isOpen)

//   // ⏱️ Auto-open chat after 4 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsOpen(true)
//     }, 7000)
//     return () => clearTimeout(timer)
//   }, [])

//   // 🧠 Bot reply logic
//   const getBotReply = (lower) => {
//     if (lower.includes('hello') || lower.includes('hi')) {
//       return 'Hey! 👋 I’m here to help you explore Samuel’s work. What would you like to know?'
//     } else if (lower.includes('who are you')) {
//       return `I'm Idaewor S.E Providence — a creative technologist and artist. I blend code and creativity to build functional and imaginative solutions.`
//     } else if (lower.includes('what services') || lower.includes('offer')) {
//       return `I offer services including:\n• Book Covers\n• Illustrations\n• Comics\n• 3D Modeling\n• Product Design\n• Audio, Video & Image Editing\n• Graphic Design\n• Frontend/Backend Dev\n• Mobile Apps\n• Video Editing & Animation.`
//     } else if (lower.includes('what are your skills')) {
//       return `My soft skills: Honesty, Teamwork, Creativity, Cognitive Thinking.\nHard skills being developed: Web3, AI Dev, Game Dev.`
//     } else if (lower.includes('philosophy')) {
//       return `Curiosity is my superpower. I believe both art and technology are tools for transformation — they connect, inspire, and empower.`
//     } else if (lower.includes('collaborate') || lower.includes('can we collaborate')) {
//       return `Absolutely! I love creative collaborations — whether it’s art, tech, or educational projects. Let’s make something meaningful together. 🤝`
//     } else if (
//       lower.includes('show me your work') ||
//       lower.includes('portfolio') ||
//       lower.includes('project')
//     ) {
//       return `Close me and go through the website`
//     } else if (
//       lower.includes('contact') ||
//       lower.includes('how do i contact you') ||
//       lower.includes('reach you')
//     ) {
//       return `You can reach me via email at: idaeworsamuelprovidence@gmail.com or use the contact form on my site. Let's connect!`
//     } else if (lower.includes('e_sai_art') || lower.includes('what does e_sai_art mean')) {
//       return `E_sai_Art (The Skywalker) is my artistic alias — it represents a journey of storytelling, personal growth, and creative reinvention. ✨`
//     }
//     return `Hmm... I'm not sure how to respond to that yet. You can ask about my services, skills, or see my works or contact me?`
//   }

//   // 💬 Send message
//   const handleSend = (textOverride = null) => {
//     const finalInput = textOverride || input.trim()
//     if (!finalInput) return

//     const userMessage = { from: 'user', text: finalInput }
//     setMessages((prev) => [...prev, userMessage])
//     setInput('')
//     setIsTyping(true)

//     const lower = finalInput.toLowerCase()
//     const reply = getBotReply(lower)

//     setTimeout(() => {
//       setMessages((prev) => [...prev, { from: 'bot', text: reply }])
//       setIsTyping(false)
//     }, 700)
//   }

//   // 🎤 Voice input
//   const startSpeechRecognition = () => {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert('Speech recognition not supported in this browser')
//       return
//     }

//     const recognition = new window.webkitSpeechRecognition()
//     recognition.lang = 'en-US'
//     recognition.interimResults = false
//     recognition.maxAlternatives = 1

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript
//       setInput(transcript)
//       handleSend(transcript)
//     }

//     recognition.onerror = (event) => {
//       console.error('Speech error', event.error)
//     }

//     recognitionRef.current = recognition
//     recognition.start()
//   }

//   return (
//     <div className="fixed bottom-12 right-4 z-50">
//       {/* Toggle Button */}
//       <button
//         className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg"
//         onClick={toggleChat}
//       >
//         <FiMessageCircle size={24} />
//       </button>

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="w-80 h-[500px] bg-white dark:bg-slate-800 rounded-xl shadow-2xl flex flex-col mt-3">
//           {/* Header */}
//           <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl text-sm font-semibold">
//             Chat with me!
//           </div>

//           {/* Messages */}
//           <div
//             className="flex-1 p-3 space-y-2 text-sm overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
//             style={{
//               scrollbarWidth: 'thin',
//               scrollbarColor: 'black transparent',
//             }}
//           >
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`p-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
//                   msg.from === 'user'
//                     ? 'bg-blue-100 self-end'
//                     : 'bg-gray-200 dark:bg-slate-700 text-white self-start'
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             {isTyping && (
//               <div className="text-gray-400 italic text-xs">Typing...</div>
//             )}
//           </div>

//           {/* Suggestions */}
//           <div
//             className="flex gap-2 overflow-x-auto px-2 py-1 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
//             style={{
//               scrollbarWidth: 'thin',
//               scrollbarColor: 'black transparent',
//             }}
//           >
//             {suggestions.map((s, i) => (
//               <button
//                 key={i}
//                 onClick={() => handleSend(s)}
//                 className="text-xs whitespace-nowrap bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-white px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-900"
//               >
//                 {s}
//               </button>
//             ))}
//           </div>

//           {/* Input */}
//           <div className="flex border-t border-gray-300 dark:border-slate-700 p-2">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//               placeholder="Type something..."
//               className="flex-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-slate-700 focus:outline-none"
//             />
//             <button
//               onClick={handleSend}
//               className="ml-2 text-blue-600 hover:text-blue-800"
//               title="Send"
//             >
//               <FiSend size={20} />
//             </button>
//             <button
//               onClick={startSpeechRecognition}
//               className="ml-2 text-blue-600 hover:text-blue-800"
//               title="Speak"
//             >
//               {/* <FiMic size={20} /> */}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }















'use client'

import { useEffect, useRef, useState } from 'react'
import { FiSend, FiMessageCircle, FiMic, FiX, FiMinimize } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const defaultMessages = [
  {
    from: 'bot',
    text: 'Hi there! 👋 I\'m your virtual assistant. Ask me anything about my work, skills, or how we can collaborate or click the icons below to browse.',
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

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(defaultMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const recognitionRef = useRef(null)
  const messagesEndRef = useRef(null)
  const { darkMode } = useTheme()

  const toggleChat = () => setIsOpen(!isOpen)
  const toggleMinimize = () => setIsMinimized(!isMinimized)

  // ⏱️ Auto-open chat after 4 seconds
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
      return `I offer services including:\n• Book Covers\n• Illustrations\n• Comics\n• 3D Modeling\n• Product Design\n• Audio, Video & Image Editing\n• Graphic Design\n• Frontend/Backend Dev\n• Mobile Apps\n• Video Editing & Animation.`
    } else if (lower.includes('what are your skills') || lower.includes('skills') || lower.includes('expertise')) {
      return `My soft skills: Honesty, Teamwork, Creativity, Cognitive Thinking.\nHard skills being developed: Web3, AI Dev, Game Dev.`
    } else if (lower.includes('philosophy') || lower.includes('belief')) {
      return `Curiosity is my superpower. I believe both art and technology are tools for transformation — they connect, inspire, and empower.`
    } else if (lower.includes('collaborate') || lower.includes('can we collaborate') || lower.includes('work together')) {
      return `Absolutely! I love creative collaborations — whether it's art, tech, or educational projects. Let's make something meaningful together. 🤝`
    } else if (
      lower.includes('show me your work') ||
      lower.includes('portfolio') ||
      lower.includes('project')
    ) {
      return `You can view my work in the following sections:\n• Technical Portfolio: Websites & Apps\n• Artistic Portfolio: 2D & 3D Art\n• Graphic Gallery: Design Projects\n\nClose the chat and explore the page sections above!`
    } else if (
      lower.includes('contact') ||
      lower.includes('how do i contact you') ||
      lower.includes('reach you') ||
      lower.includes('email')
    ) {
      return `You can reach me via email at: idaeworsamuelprovidence@gmail.com or use the contact form on my site. You can also call: +234 811 782 0918 or +234 810 866 6501`
    } else if (lower.includes('e_sai_art') || lower.includes('what does e_sai_art mean') || lower.includes('skywalker')) {
      return `E_sai_Art (The Skywalker) is my artistic alias — it represents a journey of storytelling, personal growth, and creative reinvention. ✨`
    } else if (lower.includes('thank') || lower.includes('thanks')) {
      return `You're welcome! 😊 Feel free to ask anything else.`
    } else if (lower.includes('bye') || lower.includes('goodbye') || lower.includes('see you')) {
      return `Goodbye! 👋 Feel free to come back anytime. Have a great day!`
    }
    return `Hmm... I'm not sure how to respond to that yet. You can ask about:\n• My services\n• Skills & expertise\n• Portfolio examples\n• Contact information\n• Collaboration opportunities`
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
    }, 700)
  }

  // 🎤 Voice input
  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser')
      return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

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
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className={`flex items-center gap-2 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          darkMode
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <FiX size={20} /> : <FiMessageCircle size={20} />}
      </button>

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className={`w-80 sm:w-96 h-[500px] rounded-xl shadow-2xl flex flex-col mt-3 border transition-all duration-300 ${
          darkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-blue-100'
        }`}>
          {/* Header */}
          <div className={`px-4 py-3 rounded-t-xl flex justify-between items-center ${
            darkMode
              ? 'bg-blue-800 text-white'
              : 'bg-blue-600 text-white'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isTyping ? 'bg-green-400 animate-pulse' : 'bg-green-400'
              }`} />
              <span className="font-semibold">Chat Assistant</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleMinimize}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Minimize chat"
              >
                <FiMinimize size={16} />
              </button>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Close chat"
              >
                <FiX size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: darkMode ? '#475569 #1e293b' : '#cbd5e1 #f1f5f9',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-[85%] whitespace-pre-wrap shadow-sm ${
                  msg.from === 'user'
                    ? darkMode
                      ? 'bg-blue-600 text-white ml-auto rounded-br-none'
                      : 'bg-blue-500 text-white ml-auto rounded-br-none'
                    : darkMode
                      ? 'bg-slate-700 text-gray-200 mr-auto rounded-bl-none'
                      : 'bg-gray-100 text-gray-800 mr-auto rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className={`flex gap-1 items-center ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="ml-2 text-sm italic">Assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="px-3 py-2 border-t"
            style={{
              borderColor: darkMode ? '#334155' : '#e2e8f0',
            }}
          >
            <div className="text-xs font-medium mb-2 px-1"
              style={{
                color: darkMode ? '#94a3b8' : '#64748b',
              }}
            >
              Quick suggestions:
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 ${
                    darkMode
                      ? 'bg-slate-700 hover:bg-slate-600 text-gray-200'
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t"
            style={{
              borderColor: darkMode ? '#334155' : '#e2e8f0',
            }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message here..."
                className={`flex-1 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  darkMode
                    ? 'bg-slate-700 text-white placeholder-gray-400 focus:ring-blue-500'
                    : 'bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-blue-400'
                }`}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-gray-500'
                      : 'bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-400'
                  }`}
                  aria-label="Send message"
                >
                  <FiSend size={18} className={darkMode ? 'text-white' : 'text-white'} />
                </button>
                <button
                  onClick={startSpeechRecognition}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-slate-700 hover:bg-slate-600'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label="Voice input"
                  title="Voice input (Chrome only)"
                >
                  <FiMic size={18} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                </button>
              </div>
            </div>
            <div className={`text-xs mt-2 px-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Press Enter to send • Try voice input in Chrome
            </div>
          </div>
        </div>
      )}

      {/* Minimized Chat */}
      {isOpen && isMinimized && (
        <div className={`mt-3 p-3 rounded-lg shadow-lg border ${
          darkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-blue-100'
        }`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Chat Assistant
              </span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={toggleMinimize}
                className={`p-1 rounded ${
                  darkMode 
                    ? 'hover:bg-slate-700' 
                    : 'hover:bg-gray-100'
                }`}
                aria-label="Restore chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </button>
              <button
                onClick={toggleChat}
                className={`p-1 rounded ${
                  darkMode 
                    ? 'hover:bg-slate-700' 
                    : 'hover:bg-gray-100'
                }`}
                aria-label="Close chat"
              >
                <FiX size={16} />
              </button>
            </div>
          </div>
          <div className={`text-xs mt-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Chat minimized. Click to restore.
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          border-radius: 3px;
        }
      `}</style>
    </div>
  )
}