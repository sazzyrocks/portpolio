import React, { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, Send, Loader2, AlertCircle } from "lucide-react"
import confetti from "canvas-confetti"
import { PORTFOLIO_DATA } from "../data/portfolioData"
import { GitHubIcon } from "./icons/GitHubIcon"
import { LinkedInIcon } from "./icons/LinkedInIcon"
import { SectionHeader } from "./SectionHeader"

export const ContactSection: React.FC = () => {
  const { profile } = PORTFOLIO_DATA
  const [copied, setCopied] = useState<boolean>(false)

  // Form states (Handling the strict 8-state rule)
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#c99558", "#dfb27c", "#ffffff"],
    })
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error")
      setErrorMessage("Please complete all required fields before dispatching.")
      return
    }

    if (!email.includes("@") || !email.includes(".")) {
      setStatus("error")
      setErrorMessage("Please provide a valid email address.")
      return
    }

    setStatus("loading")
    setErrorMessage("")

    // Simulating graceful submission with mailto fallback
    setTimeout(() => {
      setStatus("success")
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#c99558", "#dfb27c", "#ffffff"],
      })
      // Open native mailto
      window.location.href = `mailto:${profile.email}?subject=Inquiry from ${encodeURIComponent(
        name
      )}&body=${encodeURIComponent(message + "\n\nReply to: " + email)}`
    }, 900)
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 border-t border-[#1e2129]">
      <div className="max-w-6xl mx-auto">
        {/* Reusable Section Header */}
        <SectionHeader
          eyebrow="05 / Dialogue & Inquiry"
          title="Initiate a conversation"
          badge="Direct Channels"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Inquiries & Tactile Copy */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-[#f4efea]">
                Open for bespoke engineering & collaboration
              </h3>
              <p className="text-sm font-sans text-[#9e9992] leading-relaxed">
                Whether you're developing high-fps 3D web applications, require full-stack system architecture, or seek a passionate developer who treats craft with uncompromising care, my inbox is always open.
              </p>
            </div>

            {/* Tactile Copy Email Pill */}
            <div className="p-5 rounded-2xl bg-[#121418] border border-[#222530] flex flex-col gap-3">
              <span className="text-[11px] font-mono text-[#69655f] uppercase tracking-wider">
                Direct Electronic Mail
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs sm:text-sm text-[#f4efea] select-all truncate">
                  {profile.email}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-lg bg-[#1a1d26] hover:bg-[#252a38] text-xs font-mono text-[#c99558] border border-[#292d3c] flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-[#c99558]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Social / External Links */}
            <div className="flex items-center gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#121418] hover:bg-[#181a20] border border-[#222530] text-xs font-mono text-[#9e9992] hover:text-[#f4efea] transition-colors focus-visible:outline-2 focus-visible:outline-[#c99558]"
              >
                <GitHubIcon className="w-4 h-4 text-[#c99558]" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={(profile as any).linkedin || "https://linkedin.com/in/sajalporey"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#121418] hover:bg-[#181a20] border border-[#222530] text-xs font-mono text-[#9e9992] hover:text-[#f4efea] transition-colors focus-visible:outline-2 focus-visible:outline-[#c99558]"
              >
                <LinkedInIcon className="w-4 h-4 text-[#c99558]" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Right Column: 8-State Interactive Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-[#121418] border border-[#222530] rounded-2xl p-6 sm:p-8 space-y-5"
              noValidate
            >
              <h3 className="font-serif text-xl text-[#f4efea]">
                Dispatch a Message
              </h3>

              {status === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs font-mono">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dispatch initialized! Redirecting to mail client...</span>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-xs font-mono text-[#9e9992] block">
                  Your Full Name <span className="text-[#c99558]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 rounded-xl bg-[#181a20] border border-[#262a34] text-[#f4efea] placeholder-[#69655f] text-sm focus-visible:outline-none focus-visible:border-[#c99558] focus-visible:ring-1 focus-visible:ring-[#c99558] transition-colors disabled:opacity-50"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-xs font-mono text-[#9e9992] block">
                  Your Email Address <span className="text-[#c99558]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. eleanor@studio.co"
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 rounded-xl bg-[#181a20] border border-[#262a34] text-[#f4efea] placeholder-[#69655f] text-sm focus-visible:outline-none focus-visible:border-[#c99558] focus-visible:ring-1 focus-visible:ring-[#c99558] transition-colors disabled:opacity-50"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono text-[#9e9992] block">
                  Inquiry / Project Scope <span className="text-[#c99558]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your vision, timeline, and architectural objectives..."
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 rounded-xl bg-[#181a20] border border-[#262a34] text-[#f4efea] placeholder-[#69655f] text-sm focus-visible:outline-none focus-visible:border-[#c99558] focus-visible:ring-1 focus-visible:ring-[#c99558] transition-colors disabled:opacity-50 resize-y"
                  required
                />
              </div>

              {/* Submit CTA */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 rounded-xl bg-[#c99558] hover:bg-[#dfb27c] text-[#0b0c0e] font-sans font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#c99558]"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing Dispatch...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
