import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqs = {
  "For Schools & Principals": [
    { q: "What grades does PocketEd cover?", a: "PocketEd currently runs programmes for Grades 6–8, with curriculum designed specifically for each age group's learning level and real-life context." },
    { q: "Do teachers need a finance background to deliver PocketEd sessions?", a: "Not at all. Every teacher goes through a structured onboarding session with our curriculum developer and receives a full teacher manual before day one." },
    { q: "How many sessions are included in the programme?", a: "We offer 2–4 sessions per month depending on the plan your school chooses. Each session runs between 45–60 minutes." },
    { q: "Is the curriculum aligned with CBSE/ICSE boards?", a: "PocketEd is designed as a complementary life skills programme — it doesn't replace any subject but integrates smoothly alongside the existing academic timetable." },
    { q: "What does the school need to provide?", a: "Just a classroom and willing students. We bring the curriculum, activity sheets, teacher manual, and facilitator support." }
  ],
  "For Parents": [
    { q: "Why does my child need financial literacy at this age?", a: "Habits around money form early. PocketEd helps students in Grades 6–8 develop smart money thinking — saving, budgeting, and understanding value — before the world teaches them the hard way." },
    { q: "Is this an extra burden on my child's academic schedule?", a: "No. Sessions are activity-based and run within school hours. Students find them engaging, not stressful — there's no exam or grading involved." },
    { q: "Will my child be taught to invest or trade?", a: "No. The focus is on age-appropriate concepts — pocket money management, needs vs wants, budgeting, and basic entrepreneurship thinking. Nothing beyond what's relevant for their stage of life." },
    { q: "How will I know if my child is actually learning?", a: "You'll receive periodic progress updates through the school. Our student progress dashboard tracks engagement and understanding across every session." },
    { q: "Can I attend a session to see what it's like?", a: "Absolutely. We encourage parents to attend our open sessions and community events — like the ones we run before partnering with a school — so you can see PocketEd in action before committing." }
  ],
  "For Teachers": [
    { q: "What support do I get after the onboarding session?", a: "You get continuous WhatsApp and on-call support from the PocketEd team, monthly content refreshes, and access to a student progress dashboard throughout the programme." },
    { q: "What if I'm not confident delivering a particular topic?", a: "Every lesson comes fully scripted with an activity guide. And our team is always a message away if you need help before or after a session." },
    { q: "How long does the teacher onboarding take?", a: "The onboarding session runs 45–60 minutes with our curriculum developer. It's practical, hands-on, and designed to get you confident before your very first class." },
    { q: "Will the curriculum change over time?", a: "Yes — and that's a good thing. We send monthly content refreshes so your sessions always stay relevant, relatable, and fresh for students." },
    { q: "What if my students aren't engaging with the material?", a: "Our team supports you through it. From alternate activity suggestions to one-on-one calls with our curriculum developer, we help you adapt the session to your classroom — not the other way around." }
  ]
};

type Category = keyof typeof faqs;

export default function FaqModal({ isOpen, onClose }: FaqModalProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("For Schools & Principals");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            className="bg-white rounded-[24px] w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
          >
            {/* Header Area with Character */}
            <div className="relative pt-12 pb-6 px-6 md:px-8 bg-gradient-to-b from-[var(--primary-blue-light, #e0ebf9)] to-white flex flex-col items-center border-b border-gray-100 shrink-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-full transition-colors shadow-sm"
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="w-32 h-32 relative -mt-6 mb-4">
                <Image
                  src="/faq_girl_cha.PNG"
                  alt="FAQ Girl"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-[#014AAC] text-center font-[Poppins]">
                Frequently Asked Questions
              </h2>
              
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {(Object.keys(faqs) as Category[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setOpenIndex(null);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold font-[Poppins] transition-all ${
                      activeCategory === cat
                        ? 'bg-[#FFD21F] text-[#014AAC] shadow-sm'
                        : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            <div className="p-6 md:p-8 overflow-y-auto font-[Poppins]">
              <div className="space-y-4">
                {faqs[activeCategory].map((item, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className={`w-full flex justify-between items-center p-4 text-left font-semibold hover:bg-gray-50 transition-colors ${
                          isOpen ? 'bg-gray-50 text-[#014AAC]' : 'text-gray-800'
                        }`}
                      >
                        <span className="pr-4">{item.q}</span>
                        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#014AAC] text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-50 bg-gray-50">
                              <div className="pt-2">{item.a}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
