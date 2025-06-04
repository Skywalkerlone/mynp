"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true })

  const errors = {
    name: formData.name.trim() === "" ? "Name is required." : "",
    email:
      formData.email.trim() === ""
        ? "Email is required."
        : !emailRegex.test(formData.email)
        ? "Please enter a valid email."
        : "",
    message:
      formData.message.trim() === ""
        ? "Message is required."
        : formData.message.trim().length < 10
        ? "Message must be at least 10 characters."
        : "",
  }

  const isFormValid = !errors.name && !errors.email && !errors.message

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isFormValid) return
    setSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
    setTouched({ name: false, email: false, message: false })
    // submit logic
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 bg-gradient-to-b from-sky-100 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white"
    >
      <h2 className="text-5xl text-blue-200 font-bold m-6 text-center">Contact  </h2> 
      {/* Background Animated Clip Art */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="wave-bg absolute top-0 left-0 w-full h-[300px] opacity-70 "></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 z-10">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Left Text Area */}
          <motion.div
            className="md:w-1/2 flex items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-slate-900 p-10 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-3xl font-semibold mb-5">Reach Out</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Have questions, ideas, or want to collaborate? Use the form on the right to send me a message. I am here to listen and help!
              </p>
              <p className="text-gray-700 m-4 dark:text-gray-300 leading-relaxed">+234 8117820918</p>
            </div>
          </motion.div>

          {/* Right Contact Form */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-lg p-10 shadow-lg border border-white/30 rounded-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-12 text-center"
              >
                Contact Me
              </motion.h2>

              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                className="space-y-10"
                onSubmit={handleSubmit}
                noValidate
              >
                <input type="hidden" name="access_key" value="24d1eb49-5f69-4396-b1ca-7763dac612c5" />

                {["name", "email", "message"].map((field) => (
                  <div className="relative" key={field}>
                    {field !== "message" ? (
                      <input
                        type={field === "email" ? "email" : "text"}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        placeholder=" "
                        aria-invalid={!!errors[field]}
                        aria-describedby={`${field}-error`}
                        className={`peer block w-full appearance-none border-b-2 py-3 px-0 text-lg bg-transparent transition
                          ${
                            errors[field] && touched[field]
                              ? "border-red-500 text-red-600 focus:border-red-600"
                              : "border-gray-300 text-slate-900 dark:text-white focus:border-blue-500"
                          } focus:outline-none`}
                      />
                    ) : (
                      <textarea
                        id={field}
                        name={field}
                        rows="6"
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        placeholder=" "
                        aria-invalid={!!errors[field]}
                        aria-describedby={`${field}-error`}
                        className={`peer block w-full appearance-none border-b-2 py-3 px-0 text-lg bg-transparent resize-none transition
                          ${
                            errors[field] && touched[field]
                              ? "border-red-500 text-red-600 focus:border-red-600"
                              : "border-gray-300 text-slate-900 dark:text-white focus:border-blue-500"
                          } focus:outline-none`}
                      />
                    )}

                    <label
                      htmlFor={field}
                      className={`absolute left-0 top-3 text-lg transition-all duration-300 ease-in-out origin-left peer-placeholder-shown:top-6 peer-placeholder-shown:scale-100
                        peer-focus:top-1 peer-focus:scale-110 peer-focus:text-sm
                        ${
                          errors[field] && touched[field]
                            ? "text-red-500 peer-focus:text-red-600"
                            : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600"
                        }`}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>

                    <AnimatePresence>
                      {errors[field] && touched[field] && (
                        <motion.p
                          id={`${field}-error`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1 text-sm text-red-600"
                        >
                          {errors[field]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!isFormValid}
                  className="relative overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-md w-full md:w-auto text-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">Send Message</span>
                  <span
                    className="absolute top-0 left-[-100%] w-full h-full bg-white/30 transform skew-x-[-20deg]"
                    style={{ animation: "shine 2s infinite linear" }}
                  />
                </motion.button>

                <AnimatePresence>
                  {submitted && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-6 text-center text-green-600 font-semibold"
                    >
                      Thank you for reaching out! I will get back to you soon.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
<style jsx>{`
  @keyframes shine {
    0% {
      left: -100%;
    }
    50% {
      left: 500%;
    }
    100% {
      left: 700%;
    }
  }

  @keyframes waveMove {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

.wave-bg {
    height: 100vh;
    width: 200%;
    position: absolute;
    top: 0;
    left: 0;
    background: radial-gradient(circle at 50% 60%, rgba(0, 136, 255, 0.2) 20%, transparent 70%) repeat-x;
    background-size: 50% 100%;
    animation: waveMove 10s linear infinite;
    opacity: 0.7;
    z-index: -1;
}

@keyframes waveMove {
    0% { background-position-x: 0%; }
    100% { background-position-x: 100%; }
}
`}</style>
    </section>
  )
}
