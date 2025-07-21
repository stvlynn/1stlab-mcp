"use client";

import { AnimatePresence, motion } from "framer-motion";

import { Section } from "@/types/landing";
import { useState } from "react";

export default function ({ section }: { section: Section }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-5xl font-bold text-center mb-8 text-white">{section.title}</h2>
      <p className="text-center text-2xl mb-8 text-white/80">{section.description}</p>

      <div className="space-y-4">
        {section?.items?.map((faq, index) => (
          <div
            key={index}
            className="border border-white/30 bg-white/20 backdrop-blur-xl rounded-32 overflow-hidden shadow-lg hover:bg-white/30 hover:border-white/40 transition-all duration-300"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-black/80">{faq.title}</span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-200 text-black/60 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-4 bg-white/10 backdrop-blur-xl border-t border-white/20"
                >
                  <p className="text-black/70">{faq.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
