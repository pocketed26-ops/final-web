import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubmitStatus = 'idle' | 'success' | 'error';

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ fullName: '', email: '', role: '', message: '' });
        setErrors({});
        // Auto-close after 3 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
          onClose();
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleClose = () => {
    setSubmitStatus('idle');
    setErrorMessage('');
    onClose();
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          style={{ WebkitBackdropFilter: 'blur(4px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-[24px] w-full max-w-md shadow-2xl overflow-hidden border border-gray-100"
          >
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                /* ── SUCCESS SCREEN ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="p-10 flex flex-col items-center text-center"
                >
                  {/* Animated checkmark circle */}
                  <div className="relative w-20 h-20 mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-200"
                    >
                      <motion.svg
                        width="36" height="36" viewBox="0 0 24 24" fill="none"
                        stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                      >
                        <motion.polyline points="20 6 9 17 4 12" />
                      </motion.svg>
                    </motion.div>
                    {/* Ripple */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.6 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="absolute inset-0 rounded-full bg-green-400"
                    />
                  </div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold text-gray-900 mb-2"
                  >
                    Message Sent! 🎉
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-500 text-sm leading-relaxed mb-6"
                  >
                    Thank you for reaching out! We've received your message and will get back to you very soon.
                  </motion.p>

                  {/* Auto-close progress bar */}
                  <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                    <motion.div
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 3, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Closing automatically…</p>
                </motion.div>
              ) : (
                /* ── FORM ── */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 md:p-8"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Get in touch</h2>
                      <p className="text-sm text-gray-500 mt-1">We'd love to hear from you.</p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Close modal"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>

                  {/* Error banner */}
                  <AnimatePresence>
                    {submitStatus === 'error' && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </div>
                        <p className="text-red-600 text-sm font-medium leading-snug">{errorMessage}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Full Name</label>
                      <input
                        type="text" id="fullName" name="fullName"
                        value={formData.fullName} onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent outline-none transition-all ${errors.fullName ? 'border-red-500 bg-red-50/50' : 'border-gray-200'}`}
                        placeholder="Atharva Shewale" disabled={isSubmitting}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Email</label>
                      <input
                        type="email" id="email" name="email"
                        value={formData.email} onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50/50' : 'border-gray-200'}`}
                        placeholder="atharvashewale@example.com" disabled={isSubmitting}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Role</label>
                      <select
                        id="role" name="role"
                        value={formData.role} onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent outline-none transition-all ${errors.role ? 'border-red-500 bg-red-50/50' : 'border-gray-200'}`}
                        disabled={isSubmitting}
                      >
                        <option value="" disabled>Select your role</option>
                        <option value="student">Student</option>
                        <option value="parent">Parent</option>
                        <option value="school">School</option>
                      </select>
                      {errors.role && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.role}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Message</label>
                      <textarea
                        id="message" name="message"
                        value={formData.message} onChange={handleChange}
                        rows={4}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent outline-none transition-all resize-none ${errors.message ? 'border-red-500 bg-red-50/50' : 'border-gray-200'}`}
                        placeholder="How can we help you?" disabled={isSubmitting}
                      ></textarea>
                      {errors.message && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.message}</p>}
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit" disabled={isSubmitting}
                        className="w-full bg-[var(--primary-blue)] text-white font-semibold py-3.5 rounded-2xl hover:bg-blue-600 active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:active:scale-100"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                              <line x1="22" y1="2" x2="11" y2="13"></line>
                              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
