"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TypingAnimation({ texts, delay = 2000 }: { texts: string[]; delay?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, delay);

    return () => clearInterval(interval);
  }, [texts, delay]);

  return (
    <div className="relative flex items-center h-[1.2em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-accent"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
