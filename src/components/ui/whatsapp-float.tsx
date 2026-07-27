"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";

export function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <motion.a
      href="https://wa.me/918140353442"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_4px_36px_rgba(37,211,102,0.65)] transition-shadow"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <FaWhatsapp className="w-7 h-7 text-white relative z-10" />
    </motion.a>
  );
}
