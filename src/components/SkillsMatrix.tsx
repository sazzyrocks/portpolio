import React from "react"
import { motion } from "framer-motion"
import { Eye, Server, Cpu, CheckCircle } from "lucide-react"
import { PORTFOLIO_DATA } from "../data/portfolioData"
import { SectionHeader } from "./SectionHeader"

const ICONS = {
  Eye: Eye,
  Server: Server,
  Cpu: Cpu,
}

export const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 border-t border-[#1e2129]">
      <div className="max-w-6xl mx-auto">
        {/* Reusable Section Header */}
        <SectionHeader
          eyebrow="03 / Technical Arsenal"
          title="Instruments of computation & design"
          badge="Full-Stack & WebGL Precision"
        />

        {/* 3 Categories Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.skillCategories.map((category, idx) => {
            const Icon = ICONS[category.iconName as keyof typeof ICONS] || Cpu

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="bg-[#121418] border border-[#222530] hover:border-[#c99558]/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#181a22] border border-[#272b36] flex items-center justify-center text-[#c99558]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold text-lg text-[#f4efea]">
                        {category.title}
                      </h3>
                      <p className="text-xs text-[#9e9992]">{category.subtitle}</p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-5 mt-6">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-[#f4efea]">{skill.name}</span>
                          <span className="font-mono text-[11px] text-[#c99558]">
                            {skill.level}%
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-[#1b1d24] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: sIdx * 0.1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-[#c99558] to-[#dfb27c] rounded-full"
                          />
                        </div>
                        <p className="text-[11px] text-[#69655f] font-sans">{skill.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1e2128] flex items-center gap-2 text-xs font-mono text-[#69655f]">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Production-tested workflows</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
