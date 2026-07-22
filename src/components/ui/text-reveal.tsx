"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const words = text.split(" ");

  return (
    <div className={cn("flex flex-wrap overflow-hidden", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-2 inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "100%", rotate: 5, opacity: 0 }}
            whileInView={{ y: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </div>
  );
}
