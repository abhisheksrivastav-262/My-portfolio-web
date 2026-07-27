"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "A typical full-stack web application takes anywhere from 4 to 8 weeks depending on the complexity, features required, and the feedback cycles. For smaller landing pages or portfolio sites, the timeline is usually 1-2 weeks."
  },
  {
    question: "Do you work with agencies or just direct clients?",
    answer: "Both! I often collaborate with design and marketing agencies as their technical partner, while also taking on direct clients who need an end-to-end digital solution."
  },
  {
    question: "What technologies do you primarily use?",
    answer: "Our core stack includes React / Next.js for full-stack capabilities, Tailwind CSS for styling, Framer Motion for animations, and Node.js / PostgreSQL for backend services. We use modern web development tools to build fast, scalable and responsive websites."
  },
  {
    question: "Do you provide ongoing maintenance after launch?",
    answer: "Yes, I offer custom retainer packages for ongoing maintenance, updates, and scaling the application as your user base grows. I ensure the software remains secure and up-to-date."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-[#020202]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`border border-white/10 rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-white/5' : 'bg-transparent hover:bg-white/[0.02]'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-bold text-white">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-white/10 text-white'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
