"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FaPhone, 
  FaEnvelope, 
  FaWhatsapp, 
  FaCheck, 
  FaClock,
  FaLaptop,
  FaPalette,
  FaVideo,
  FaRobot,
  FaComments
} from "react-icons/fa"
import { MdEmail, MdComputer } from "react-icons/md"
import { useTheme } from "../context/ThemeContext"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SERVICE_CONFIG = {
  web: {
    label: "Tell me about your website or app",
    placeholder: "Pages, features, deadline, inspiration…",
    subject: "Web / App Development Inquiry",
    icon: <MdComputer className="text-blue-500 text-xl" />
  },
  design: {
    label: "Describe the design or artwork",
    placeholder: "Style, references, usage, deadline…",
    subject: "Design / Digital Art Inquiry",
    icon: <FaPalette className="text-blue-500 text-xl" />
  },
  video: {
    label: "Tell me about the video or animation",
    placeholder: "Length, style, platform, references…",
    subject: "Video / Animation Inquiry",
    icon: <FaVideo className="text-blue-500 text-xl" />
  },
  ai: {
    label: "Explain your AI training needs",
    placeholder: "Dataset type, goals, format, scope…",
    subject: "AI Training Inquiry",
    icon: <FaRobot className="text-blue-500 text-xl" />
  },
  tutorial: {
    label: "What do you want to learn?",
    placeholder: "Topic, level, timeline…",
    subject: "Tutorial / Teaching Inquiry",
    icon: <FaLaptop className="text-blue-500 text-xl" />
  },
  other: {
    label: "Your message",
    placeholder: "Tell me what you need…",
    subject: "General Contact Inquiry",
    icon: <FaComments className="text-blue-500 text-xl" />
  },
}

// Interactive Wave Animation
const WaveAnimation = () => {
  const { darkMode } = useTheme()
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const animationRef = useRef(null)
  const timeRef = useRef(0)
  const pointerRef = useRef({
    x: 0,
    y: 0,
    active: false
  })

  const baseColor = darkMode ? '#0066ff' : '#3b82f6'
  const accentColor = darkMode ? '#00ffff' : '#60a5fa'
  const backgroundColor = darkMode ? 'rgba(10, 20, 40, 0.4)' : 'rgba(224, 242, 254, 0.4)'
  
  const waveCount = 3
  const waveAmplitude = 40
  const waveFrequency = 0.005
  const waveSpeed = 0.002
  const waveOffset = 100

  const waveConfigs = useMemo(() => {
    return Array.from({ length: waveCount }, (_, i) => ({
      amplitude: waveAmplitude * (0.8 + Math.random() * 0.4),
      frequency: waveFrequency * (0.8 + Math.random() * 0.4),
      speed: waveSpeed * (0.8 + Math.random() * 0.4),
      offset: i * (waveOffset / waveCount),
      phase: Math.random() * Math.PI * 2
    }))
  }, [waveCount, waveAmplitude, waveFrequency, waveSpeed, waveOffset])

  const buildCanvas = useCallback(() => {
    const wrap = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const { width, height } = wrap.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.scale(dpr, dpr)
  }, [])

  const drawWave = useCallback((ctx, config, time, width, height) => {
    const { amplitude, frequency, speed, offset, phase } = config
    const pointer = pointerRef.current
    const centerY = height / 2
    const mouseInfluence = pointer.active ? 0.3 : 0
    
    ctx.beginPath()
    ctx.moveTo(0, centerY)

    const segments = 200
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width
      const mouseDist = pointer.active ? Math.abs(pointer.x - x) : width
      const mouseFactor = Math.max(0, 1 - mouseDist / 300)
      
      let y = centerY + offset
      y += Math.sin(x * frequency + time * speed + phase) * amplitude
      
      if (pointer.active) {
        const influence = Math.sin(mouseDist * 0.02) * mouseFactor * amplitude * mouseInfluence
        y += influence
      }
      
      // Add some secondary oscillation for more organic feel
      y += Math.sin(x * frequency * 0.5 + time * speed * 1.5 + phase) * amplitude * 0.3
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    const dpr = window.devicePixelRatio || 1
    const actualWidth = width / dpr
    const actualHeight = height / dpr

    // Clear canvas with gradient background
    ctx.clearRect(0, 0, actualWidth, actualHeight)
    
    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, actualHeight)
    if (darkMode) {
      gradient.addColorStop(0, 'rgba(0, 10, 30, 0.3)')
      gradient.addColorStop(0.5, 'rgba(0, 5, 20, 0.1)')
      gradient.addColorStop(1, 'rgba(0, 2, 10, 0)')
    } else {
      gradient.addColorStop(0, 'rgba(224, 242, 254, 0.3)')
      gradient.addColorStop(0.5, 'rgba(186, 230, 253, 0.1)')
      gradient.addColorStop(1, 'rgba(186, 230, 253, 0)')
    }
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, actualWidth, actualHeight)

    timeRef.current += 0.016 // ~60fps

    // Draw waves with gradient fills
    waveConfigs.forEach((config, index) => {
      const alpha = 0.2 + (index / waveCount) * 0.3
      const waveGradient = ctx.createLinearGradient(0, actualHeight/2, 0, actualHeight)
      
      if (darkMode) {
        waveGradient.addColorStop(0, `rgba(0, 102, 255, ${alpha})`)
        waveGradient.addColorStop(0.6, `rgba(0, 255, 255, ${alpha * 0.5})`)
        waveGradient.addColorStop(1, `rgba(0, 102, 255, 0)`)
      } else {
        waveGradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`)
        waveGradient.addColorStop(0.6, `rgba(96, 165, 250, ${alpha * 0.5})`)
        waveGradient.addColorStop(1, `rgba(59, 130, 246, 0)`)
      }

      drawWave(ctx, config, timeRef.current, actualWidth, actualHeight)
      ctx.fillStyle = waveGradient
      ctx.fill()

      // Add wave outline
      drawWave(ctx, config, timeRef.current, actualWidth, actualHeight)
      ctx.strokeStyle = darkMode 
        ? `rgba(0, 200, 255, ${alpha * 0.5})`
        : `rgba(59, 130, 246, ${alpha * 0.5})`
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Draw interactive ripple effect
    if (pointerRef.current.active) {
      const { x, y } = pointerRef.current
      const rippleRadius = (timeRef.current * 500) % 600
      const rippleAlpha = Math.max(0, 1 - rippleRadius / 300)
      
      const rippleGradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, rippleRadius
      )
      rippleGradient.addColorStop(0, darkMode 
        ? `rgba(0, 200, 255, ${rippleAlpha * 0.3})`
        : `rgba(96, 165, 250, ${rippleAlpha * 0.3})`
      )
      rippleGradient.addColorStop(1, 'transparent')
      
      ctx.beginPath()
      ctx.arc(x, y, rippleRadius, 0, Math.PI * 2)
      ctx.fillStyle = rippleGradient
      ctx.fill()
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [darkMode, waveConfigs, drawWave])

  const handlePointerMove = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    pointerRef.current.x = e.clientX - rect.left
    pointerRef.current.y = e.clientY - rect.top
    pointerRef.current.active = true
  }, [])

  const handlePointerLeave = useCallback(() => {
    pointerRef.current.active = false
  }, [])

  useEffect(() => {
    buildCanvas()
    
    const handleResize = () => {
      buildCanvas()
    }
    
    let ro = null
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(handleResize)
      wrapperRef.current && ro.observe(wrapperRef.current)
    } else {
      window.addEventListener('resize', handleResize)
    }

    return () => {
      if (ro) ro.disconnect()
      else window.removeEventListener('resize', handleResize)
    }
  }, [buildCanvas])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.addEventListener('mousemove', handlePointerMove, { passive: true })
    canvas.addEventListener('mouseleave', handlePointerLeave, { passive: true })

    return () => {
      canvas.removeEventListener('mousemove', handlePointerMove)
      canvas.removeEventListener('mouseleave', handlePointerLeave)
    }
  }, [handlePointerMove, handlePointerLeave])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  return (
    <div ref={wrapperRef} className="absolute inset-0 w-full h-full overflow-hidden z-0">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  )
}

export default function Contact() {
  const { darkMode } = useTheme()
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "",
    subject: "web",
    message: "" 
  })
  const [touched, setTouched] = useState({ 
    name: false, 
    email: false, 
    phone: false,
    message: false 
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const currentService = SERVICE_CONFIG[formData.subject]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (error) setError("")
  }

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true })
  }

  const errors = {
    name: formData.name.trim() === "" ? "Name is required." : "",
    email: formData.email.trim() === "" 
      ? "Email is required." 
      : !emailRegex.test(formData.email) 
      ? "Please enter a valid email." 
      : "",
    phone: formData.phone.trim() === "" 
      ? "Phone is required." 
      : formData.phone.trim().length < 10 
      ? "Please enter a valid phone number." 
      : "",
    message: formData.message.trim() === "" 
      ? "Message is required." 
      : formData.message.trim().length < 10 
      ? "Message must be at least 10 characters." 
      : "",
  }

  const isFormValid = !errors.name && !errors.email && !errors.phone && !errors.message

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) {
      setError("Please fill in all required fields correctly.")
      return
    }
    
    setIsSubmitting(true)
    setError("")
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "24d1eb49-5f69-4396-b1ca-7763dac612c5",
          subject: `${currentService.subject} - ${formData.name}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.subject,
          message: formData.message,
          botcheck: ""
        })
      })

      const data = await response.json()
      
      if (response.status === 200 && data.success) {
        setSubmitted(true)
        setFormData({ 
          name: "", 
          email: "", 
          phone: "",
          subject: "web",
          message: "" 
        })
        setTouched({ 
          name: false, 
          email: false, 
          phone: false,
          message: false 
        })
        
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError(data.message || "Submission failed. Please try again.")
      }
    } catch (error) {
      setError("Network error. Please check your connection.")
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <FaPhone className="text-white" />,
      title: "Phone",
      details: ["+234 811 782 0918", "+234 810 866 6501"],
      action: "tel:+2348117820918",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaEnvelope className="text-white" />,
      title: "Email",
      details: ["idaeworsamuel@gmail.com"],
      action: "mailto:idaeworsamuel@gmail.com",
      color: "from-blue-500 to-blue-400"
    },
    {
      icon: <FaWhatsapp className="text-white" />,
      title: "WhatsApp",
      details: ["Chat with me directly"],
      action: "https://wa.me/2348117820918",
      color: "from-blue-500 to-green-400"
    }
  ]

  return (
    <section
      id="contact"
      className={`relative min-h-screen py-20 overflow-hidden transition-colors duration-500 ${
        darkMode 
          ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-b from-gray-50 via-white to-gray-100'
      }`}
    >
      {/* Interactive Wave Background */}
      <WaveAnimation />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
            darkMode 
              ? 'bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500' 
              : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-600'
          }`}>
            Contact Me
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Do Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.action}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, translateY: -5 }}
                className="block group"
              >
                <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-xl ${
                  darkMode 
                    ? 'bg-gray-800/60 border border-blue-500' 
                    : 'bg-white/80 border border-blue-500'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color}`}>
                      <div className="text-xl">{info.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {info.title}
                      </h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className={`text-sm ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Response Time Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`rounded-2xl p-6 border backdrop-blur-xl ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-500' 
                  : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-500'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  darkMode ? 'bg-blue-900/40' : 'bg-blue-100'
                }`}>
                  <FaClock className="text-blue-500" />
                </div>
                <h3 className={`font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Response Time
                </h3>
              </div>
              <p className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                I typically respond within <span className={`font-semibold ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>24 hours</span>. 
                For urgent inquiries, please call or use WhatsApp.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className={`rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl border ${
              darkMode 
                ? 'bg-gray-800/60 border-blue-400 ' 
                : 'bg-white/80 border-blue-400'
            }`}>
              {/* Service Selection */}
              <div className="mb-8">
                <label className={`block text-sm font-semibold mb-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  What service are you interested in?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(SERVICE_CONFIG).map(([key, service]) => (
                    <motion.button
                      key={key}
                      type="button"
                      onClick={() => setFormData({...formData, subject: key})}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                        formData.subject === key
                          ? `${
                              darkMode 
                                ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 ' 
                                : 'bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg'
                            }`
                          : `${
                              darkMode 
                                ? 'bg-gray-700/60 text-gray-300 hover:bg-gray-700/80 border border-blue-500' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-blue-500'
                            }`
                      }`}
                    >
                      <span className="text-lg">{service.icon}</span>
                      <span className="text-sm">{service.subject.split(" ")[0]}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden Fields */}
                <input type="hidden" name="access_key" value="24d1eb49-5f69-4396-b1ca-7763dac612c5" />
                <input type="hidden" name="service" value={formData.subject} />
                <input type="checkbox" name="botcheck" className="hidden" />

                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your Name *"
                      className={`w-full px-4 py-3 border-b-2 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder-gray-500 ${
                        darkMode 
                          ? 'bg-gray-700/60 text-white' 
                          : 'bg-gray-50 text-gray-900'
                      } ${
                        errors.name && touched.name
                          ? `${
                              darkMode 
                                ? 'border-red-500 focus:ring-red-500/20' 
                                : 'border-red-500 focus:ring-red-200'
                            }`
                          : `${
                              darkMode 
                                ? 'border-blue-400 focus:border-cyan-500 focus:ring-cyan-500/20' 
                                : 'border-blue-400 focus:border-blue-500 focus:ring-blue-200'
                            }`
                      }`}
                    />
                    {errors.name && touched.name && (
                      <p className={`mt-1 text-sm ${
                        darkMode ? 'text-red-400' : 'text-red-600'
                      }`}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Email Address *"
                      className={`w-full px-4 py-3 border-b-2 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder-gray-500 ${
                        darkMode 
                          ? 'bg-gray-700/60 text-white' 
                          : 'bg-gray-50 text-gray-900'
                      } ${
                        errors.email && touched.email
                          ? `${
                              darkMode 
                                ? 'border-red-500 focus:ring-red-500/20' 
                                : 'border-red-500 focus:ring-red-200'
                            }`
                          : `${
                              darkMode 
                                ? 'border-blue-400 focus:border-cyan-500 focus:ring-cyan-500/20' 
                                : 'border-blue-400 focus:border-blue-500 focus:ring-blue-200'
                            }`
                      }`}
                    />
                    {errors.email && touched.email && (
                      <p className={`mt-1 text-sm ${
                        darkMode ? 'text-red-400' : 'text-red-600'
                      }`}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone and Subject Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Phone Number *"
                      className={`w-full px-4 py-3 border-b-2 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder-gray-500 ${
                        darkMode 
                          ? 'bg-gray-700/60 text-white' 
                          : 'bg-gray-50 text-gray-900'
                      } ${
                        errors.phone && touched.phone
                          ? `${
                              darkMode 
                                ? 'border-red-500 focus:ring-red-500/20' 
                                : 'border-red-500 focus:ring-red-200'
                            }`
                          : `${
                              darkMode 
                                ? 'border-blue-400 focus:border-cyan-500 focus:ring-cyan-500/20' 
                                : 'border-blue-400 focus:border-blue-500 focus:ring-blue-200'
                            }`
                      }`}
                    />
                    {errors.phone && touched.phone && (
                      <p className={`mt-1 text-sm ${
                        darkMode ? 'text-red-400' : 'text-red-600'
                      }`}>
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <div className={`w-full px-4 py-3 border-2 rounded-xl ${
                      darkMode 
                        ? 'bg-gray-700/60 border-blue-400 text-cyan-300' 
                        : 'bg-gray-50 border-blue-400 text-gray-700'
                    }`}>
                      <p>
                        <span className="mr-2">{currentService.icon}</span>
                        {currentService.subject}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label className={`block text-sm font-semibold mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {currentService.label} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={currentService.placeholder}
                    rows="6"
                    className={`w-full px-4 py-3 border-b-2 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none placeholder-gray-500 ${
                      darkMode 
                        ? 'bg-gray-700/60 text-white' 
                        : 'bg-gray-50 text-gray-900'
                    } ${
                      errors.message && touched.message
                        ? `${
                            darkMode 
                              ? 'border-red-500 focus:ring-red-500/20' 
                              : 'border-red-500 focus:ring-red-200'
                          }`
                        : `${
                            darkMode 
                              ? 'border-blue-400 focus:border-cyan-500 focus:ring-cyan-500/20' 
                              : 'border-blue-400 focus:border-blue-500 focus:ring-blue-200'
                          }`
                    }`}
                  />
                  {errors.message && touched.message && (
                    <p className={`mt-1 text-sm ${
                      darkMode ? 'text-red-400' : 'text-red-600'
                    }`}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border backdrop-blur-xl ${
                      darkMode 
                        ? 'bg-red-900/20 border-red-800' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <p className={`text-center ${
                      darkMode ? 'text-red-400' : 'text-red-600'
                    }`}>
                      {error}
                    </p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-4 px-6 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 relative overflow-hidden group ${
                    darkMode 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600 text-white' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white'
                  }`}
                >
                  <span className={`absolute inset-0 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-cyan-500/0 via-white/10 to-cyan-500/0' 
                      : 'bg-gradient-to-r from-blue-500/0 via-white/10 to-blue-500/0'
                  } translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`} />
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="relative z-10">Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Send Message</span>
                      <MdEmail className="text-lg relative z-10 text-white" />
                    </>
                  )}
                </motion.button>

                {/* Success Message */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`p-6 rounded-2xl text-center border backdrop-blur-xlm ${
                        darkMode 
                          ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-800' 
                          : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className={`p-3 rounded-full ${
                          darkMode ? 'bg-blue-900/40' : 'bg-blue-100'
                        }`}>
                          <FaCheck className="text-blue-500 text-2xl" />
                        </div>
                        <div>
                          <h3 className={`text-xl font-semibold mb-2 ${
                            darkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            Message Sent Successfully!
                          </h3>
                          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                            Thank you for reaching out. I'll get back to you within 24 hours.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}