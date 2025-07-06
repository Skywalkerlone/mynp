'use client'

import { useEffect, useRef, useState } from 'react'
import { FiSend, FiMessageCircle, FiMic } from 'react-icons/fi'

const defaultMessages = [
  {
    from: 'bot',
    text: 'Hi there! 👋 I’m your virtual assistant. Ask me anything about my work, skills, or how we can collaborate or click the icon to browse through.',
  },
]

const suggestions = [
  'Who are you?',
  'What services do you offer?',
  'What are your skills?',
  'What’s your philosophy?',
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
  const recognitionRef = useRef(null)

  const toggleChat = () => setIsOpen(!isOpen)

  // ⏱️ Auto-open chat after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 7000)
    return () => clearTimeout(timer)
  }, [])

  // 🧠 Bot reply logic
  const getBotReply = (lower) => {
    if (lower.includes('hello') || lower.includes('hi')) {
      return 'Hey! 👋 I’m here to help you explore Samuel’s work. What would you like to know?'
    } else if (lower.includes('who are you')) {
      return `I'm Idaewor S.E Providence — a creative technologist and artist. I blend code and creativity to build functional and imaginative solutions.`
    } else if (lower.includes('what services') || lower.includes('offer')) {
      return `I offer services including:\n• Book Covers\n• Illustrations\n• Comics\n• 3D Modeling\n• Product Design\n• Audio, Video & Image Editing\n• Graphic Design\n• Frontend/Backend Dev\n• Mobile Apps\n• Video Editing & Animation.`
    } else if (lower.includes('what are your skills')) {
      return `My soft skills: Honesty, Teamwork, Creativity, Cognitive Thinking.\nHard skills being developed: Web3, AI Dev, Game Dev.`
    } else if (lower.includes('philosophy')) {
      return `Curiosity is my superpower. I believe both art and technology are tools for transformation — they connect, inspire, and empower.`
    } else if (lower.includes('collaborate') || lower.includes('can we collaborate')) {
      return `Absolutely! I love creative collaborations — whether it’s art, tech, or educational projects. Let’s make something meaningful together. 🤝`
    } else if (
      lower.includes('show me your work') ||
      lower.includes('portfolio') ||
      lower.includes('project')
    ) {
      return `Close me and go through the website`
    } else if (
      lower.includes('contact') ||
      lower.includes('how do i contact you') ||
      lower.includes('reach you')
    ) {
      return `You can reach me via email at: idaeworsamuelprovidence@gmail.com or use the contact form on my site. Let's connect!`
    } else if (lower.includes('e_sai_art') || lower.includes('what does e_sai_art mean')) {
      return `E_sai_Art (The Skywalker) is my artistic alias — it represents a journey of storytelling, personal growth, and creative reinvention. ✨`
    }
    return `Hmm... I'm not sure how to respond to that yet. You can ask about my services, skills, or see my works or contact me?`
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
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        onClick={toggleChat}
      >
        <FiMessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-[500px] bg-white dark:bg-slate-800 rounded-xl shadow-2xl flex flex-col mt-3">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl text-sm font-semibold">
            Chat with me!
          </div>

          {/* Messages */}
          <div
            className="flex-1 p-3 space-y-2 text-sm overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'black transparent',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                  msg.from === 'user'
                    ? 'bg-blue-100 self-end'
                    : 'bg-gray-200 dark:bg-slate-700 text-white self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="text-gray-400 italic text-xs">Typing...</div>
            )}
          </div>

          {/* Suggestions */}
          <div
            className="flex gap-2 overflow-x-auto px-2 py-1 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'black transparent',
            }}
          >
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                className="text-xs whitespace-nowrap bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-white px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-900"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-300 dark:border-slate-700 p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type something..."
              className="flex-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-slate-700 focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 text-blue-600 hover:text-blue-800"
              title="Send"
            >
              <FiSend size={20} />
            </button>
            <button
              onClick={startSpeechRecognition}
              className="ml-2 text-blue-600 hover:text-blue-800"
              title="Speak"
            >
              {/* <FiMic size={20} /> */}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
