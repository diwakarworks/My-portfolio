"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// TypeScript declaration for EmailJS
declare global {
  interface Window {
    emailjs: {
      init: (publicKey: string) => void;
      send: (serviceId: string, templateId: string, templateParams: any, publicKey?: string) => Promise<any>;
    };
  }
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      if (window.emailjs && process.env.NEXT_PUBLIC_EMAILJS_USER_ID) {
        window.emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID);
      }
    };
    document.head.appendChild(script);

    return () => {
      // Clean up script if component unmounts
      const existingScript = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToastMessage = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trim whitespace from form data
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      showToastMessage('Please fill in all fields before sending.', 'error');
      return;
    }

    setLoading(true);

    // Check if EmailJS is loaded
    if (typeof window !== 'undefined' && window.emailjs) {
      window.emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            from_name: trimmedName,
            from_email: trimmedEmail,
            message: trimmedMessage,
          },
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        )
        .then(() => {
          showToastMessage('Message sent successfully!', 'success');
          setFormData({ name: '', email: '', message: '' });
        })
        .catch((error) => {
          console.error('EmailJS Error:', error);
          showToastMessage('Failed to send message. Try again!', 'error');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showToastMessage('Email service not loaded. Please try again.', 'error');
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        {/* Custom Toast */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{
            opacity: showToast ? 1 : 0,
            y: showToast ? 0 : -50,
            scale: showToast ? 1 : 0.3
          }}
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 ${
            toastType === 'success' ? 'bg-emerald-500' : 'bg-red-500'
          } text-white px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm`}
        >
          <div className="flex items-center">
            {toastType === 'success' ? (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {toastMessage}
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl w-full"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
              Let's Connect
            </h1>
            <p className="text-gray-300 text-lg">
              Ready to bring your ideas to life? <br /> Let's start a conversation.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl"></div>

            <form onSubmit={handleSubmit} className="relative space-y-6">
              {/* Name Field */}
              <motion.div variants={itemVariants} className="relative">
                <motion.label
                  animate={{
                    y: focusedField === 'name' || formData.name ? -25 : 0,
                    scale: focusedField === 'name' || formData.name ? 0.85 : 1,
                    color: focusedField === 'name' ? '#a855f7' : '#d1d5db'
                  }}
                  className="absolute left-4 top-1 text-gray-400 pointer-events-none origin-left transition-all duration-200"
                >
                  Full Name
                </motion.label>
                <motion.input
                  type="text"
                  name="name"
                  placeholder="What's your good name?"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full p-4 pt-6 bg-white/5 text-white rounded-xl border border-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300 backdrop-blur-sm placeholder:text-blue-500 placeholder:text-sm"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 origin-left transition-transform duration-300"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants} className="relative">
                <motion.label
                  animate={{
                    y: focusedField === 'email' || formData.email ? -25 : 0,
                    scale: focusedField === 'email' || formData.email ? 0.85 : 1,
                    color: focusedField === 'email' ? '#a855f7' : '#d1d5db'
                  }}
                  className="absolute left-4 top-1 text-gray-400 pointer-events-none origin-left transition-all duration-200"
                >
                  Email Address
                </motion.label>
                <motion.input
                  type="email"
                  name="email"
                  placeholder="What's your web address?"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full p-4 pt-6 bg-white/5 text-white rounded-xl border border-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300 placeholder:text-blue-500 placeholder:text-sm backdrop-blur-sm"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 origin-left transition-transform duration-300"
                />
              </motion.div>

              {/* Message Field */}
              <motion.div variants={itemVariants} className="relative">
                <motion.label
                  animate={{
                    y: focusedField === 'message' || formData.message ? -25 : 0,
                    scale: focusedField === 'message' || formData.message ? 0.85 : 1,
                    color: focusedField === 'message' ? '#a855f7' : '#d1d5db'
                  }}
                  className="absolute left-4 top-1 text-gray-400 pointer-events-none origin-left transition-all duration-200"
                >
                  Your Message
                </motion.label>
                <motion.textarea
                  name="message"
                  placeholder="What do you want to say?"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField('')}
                  whileFocus={{ scale: 1.02 }}
                  className="w-full p-4 pt-6 bg-white/5 text-white rounded-xl border border-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300 placeholder:text-blue-500 placeholder:text-sm backdrop-blur-sm resize-none"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 origin-left transition-transform duration-300"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <motion.svg
                          whileHover={{ x: 5 }}
                          className="w-5 h-5 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </motion.svg>
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
