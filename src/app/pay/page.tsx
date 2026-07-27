"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Copy, Check, QrCode, Phone, Mail, Globe, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function PayPage() {
  const upiId = "8140353442@paytm";
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30 selection:text-white flex flex-col w-full overflow-hidden pt-28 pb-16">
      <CustomCursor />
      <ScrollProgress />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-glow,rgba(139,92,246,0.05)),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card backdrop-blur-md mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-foreground/80 tracking-wider uppercase">Secure Business Payments</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
          >
            Make a Payment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto"
          >
            Choose your custom amount and pay using QR code or UPI ID.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Card 1: QR & Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex"
          >
            <GlassCard className="p-8 flex flex-col justify-between items-center text-center w-full relative overflow-hidden">
              <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-primary/10 filter blur-2xl pointer-events-none" />
              
              <div className="w-full flex flex-col items-center">
                <h2 className="text-xl font-bold text-foreground mb-4">Scan QR Code</h2>
                {/* QR Code Container */}
                <div className="w-64 h-64 rounded-2xl bg-white border border-border flex flex-col items-center justify-center p-2 relative shadow-lg overflow-hidden">
                  <img
                    src="/payment-qr.png"
                    alt="Abhishek Srivastav UPI Payment QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Open any UPI app (GPay, PhonePe, Paytm, BHIM) to scan.
                </p>
              </div>

              {/* UPI Copy Action */}
              <div className="w-full mt-8 pt-6 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">UPI ID</p>
                <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-xl p-3 justify-between">
                  <span className="text-sm font-bold text-foreground font-mono">{upiId}</span>
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-all"
                    aria-label="Copy UPI ID"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Card 2: Interactive payment helper & details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex"
          >
            <GlassCard className="p-8 flex flex-col justify-between w-full relative overflow-hidden">
              <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-secondary/10 filter blur-2xl pointer-events-none" />

              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Payment Assistant</h2>
                
                {/* Enter Amount Helper */}
                <div className="space-y-2 mb-6">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Enter Invoice Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">₹</span>
                    <input
                      type="number"
                      placeholder="e.g. 299"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-muted/30 border border-border rounded-xl py-3 pl-8 pr-4 text-foreground font-bold focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p className="font-semibold text-foreground">Instructions:</p>
                  <ul className="list-disc list-inside space-y-2 pl-1">
                    <li>Type the invoice amount.</li>
                    <li>Scan the QR code or copy the UPI ID.</li>
                    <li>Complete the transaction.</li>
                    <li>Send the payment receipt screenshot on WhatsApp or email.</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-border flex flex-col gap-3">
                <MagneticButton>
                  <a
                    href={`https://wa.me/918140353442?text=Hi%20Abhishek,%20I%20have%20completed%20the%20payment%20of%20Rs.%20${amount || "___"}.%20Here%20is%20my%20receipt.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Share Receipt on WhatsApp
                  </a>
                </MagneticButton>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>+91 8140353442</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">abhitechnologies262@gmail.com</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
