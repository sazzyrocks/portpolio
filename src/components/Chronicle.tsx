import React from "react"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { PORTFOLIO_DATA } from "../data/portfolioData"
import { SectionHeader } from "./SectionHeader"

export const Chronicle: React.FC = () => {
  return (
    <section id="journey" className="py-24 px-4 sm:px-6 border-t border-[#1e2129]">
      <div className="max-w-6xl mx-auto">
        {/* Reusable Section Header */}
        <SectionHeader
          eyebrow="04 / Chronicle & Milestones"
          title="A timeline of curiosity & execution"
          badge="Historical Progression"
        />

        {/* Asymmetric Editorial Timeline */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-5 before:w-px before:bg-[#20242e]">
          {PORTFOLIO_DATA.milestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative pl-10 sm:pl-16 group"
            >
              {/* Timeline Marker Dot */}
              <div className="absolute left-1.5 sm:left-3.5 top-1.5 w-3.5 h-3.5 rounded-full bg-[#121418] border-2 border-[#c99558] group-hover:scale-125 transition-transform" />

              <div className="bg-[#121418] border border-[#222530] hover:border-[#c99558]/40 rounded-2xl p-6 sm:p-8 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#c99558] uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    {m.period}
                  </span>
                  {m.organization && (
                    <span className="text-xs font-mono text-[#69655f]">
                      {m.organization}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl text-[#f4efea] mb-3">
                  {m.title}
                </h3>

                <p className="text-sm font-sans text-[#9e9992] leading-relaxed mb-5">
                  {m.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {m.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#181a22] text-[#9e9992] border border-[#252834]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
