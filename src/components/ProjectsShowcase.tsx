import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, X, Sparkles, ArrowUpRight } from "lucide-react"
import { PORTFOLIO_DATA, type Project } from "../data/portfolioData"
import { GitHubIcon } from "./icons/GitHubIcon"
import { SectionHeader } from "./SectionHeader"

const CATEGORIES = [
  { id: "all", label: "All Repertory" },
  { id: "3d", label: "3D & WebGL" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "ai", label: "AI & Systems" },
]

interface ProjectMetricsProps {
  metrics: { label: string; value: string }[]
  size?: "sm" | "md"
}

const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ metrics, size = "sm" }) => (
  <div
    className={`grid grid-cols-3 ${
      size === "md"
        ? "gap-3 p-4 bg-[#181a22] border-[#262a35]"
        : "gap-2 py-3 px-4 bg-[#171920] border-[#232732]"
    } rounded-xl border mb-6`}
  >
    {metrics.map((m, idx) => (
      <div key={idx} className="flex flex-col">
        <span className="text-[10px] font-mono text-[#69655f] uppercase">{m.label}</span>
        <span
          className={`${
            size === "md" ? "text-sm" : "text-xs"
          } font-semibold text-[#f4efea] font-sans`}
        >
          {m.value}
        </span>
      </div>
    ))}
  </div>
)

interface ProjectTagsProps {
  tags: string[]
  highlight?: boolean
  size?: "sm" | "xs"
}

const ProjectTags: React.FC<ProjectTagsProps> = ({ tags, highlight = false, size = "xs" }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((t, idx) => (
      <span
        key={idx}
        className={`font-mono rounded-md border ${
          highlight
            ? "text-xs px-3 py-1 bg-[#1c1f28] text-[#c99558] border-[#2b303d]"
            : size === "xs"
            ? "text-[10px] px-2 py-0.5 bg-[#181a22] text-[#9e9992] border-[#262933]"
            : "text-[11px] px-2.5 py-1 bg-[#191b22] text-[#9e9992] border-[#262a34]"
        }`}
      >
        {t}
      </span>
    ))}
  </div>
)

export const ProjectsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)

  const filteredProjects =
    selectedCategory === "all"
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory)

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 border-t border-[#1e2129]">
      <div className="max-w-6xl mx-auto">
        {/* Reusable Section Header with Category Filter */}
        <SectionHeader
          eyebrow="02 / Selected Repertory"
          title="Crafted works & architectural feats"
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#13151a] border border-[#222530] rounded-full self-start md:self-auto">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-full cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#c99558] ${
                    isActive ? "text-[#f4efea]" : "text-[#9e9992] hover:text-[#f4efea]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="categoryActive"
                      className="absolute inset-0 bg-[#252833] rounded-full border border-[#3b4050]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              )
            })}
          </div>
        </SectionHeader>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {filteredProjects.map((project) => {
            const isFeatured = project.featured

            return (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`group bg-[#121418] border border-[#222530] hover:border-[#c99558]/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-colors ${
                  isFeatured ? "lg:col-span-12" : "lg:col-span-6"
                }`}
              >
                {/* For Featured Project: Asymmetric 2-Column Split */}
                {isFeatured ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
                    <div className="lg:col-span-7 rounded-xl overflow-hidden border border-[#262a35] relative group-hover:border-[#c99558]/40 transition-colors">
                      <div className="aspect-[16/10] overflow-hidden bg-[#181a20]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute top-3 left-3 bg-[#0b0c0e]/80 backdrop-blur-md border border-[#2d313d] px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-mono text-[#c99558]">
                        <Sparkles className="w-3 h-3" />
                        <span>Flagship 3D Project</span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-[#9e9992] mb-3">
                          <span className="uppercase tracking-wider text-[#c99558]">
                            {project.categoryLabel}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            Live on Vercel
                          </span>
                        </div>

                        <h3 className="font-serif text-3xl sm:text-4xl text-[#f4efea] mb-3 group-hover:text-[#c99558] transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-sm font-sans text-[#9e9992] leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Metric Highlights */}
                        <ProjectMetrics metrics={project.metrics} />

                        {/* Tags */}
                        <ProjectTags tags={project.tags} size="sm" />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-4 border-t border-[#20232b]">
                        {project.liveUrl && (
                          <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 rounded-full bg-[#c99558] hover:bg-[#dfb27c] text-[#0b0c0e] font-sans font-semibold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                          >
                            <span>Live Simulation</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </motion.a>
                        )}
                        {project.githubUrl && (
                          <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-full bg-[#181a20] hover:bg-[#20232a] text-[#f4efea] border border-[#272b35] text-xs font-mono flex items-center gap-2 cursor-pointer transition-colors"
                          >
                            <GitHubIcon className="w-3.5 h-3.5 text-[#c99558]" />
                            <span>Source Code</span>
                          </motion.a>
                        )}
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className="px-4 py-2.5 rounded-full text-xs font-mono text-[#9e9992] hover:text-[#f4efea] cursor-pointer ml-auto underline underline-offset-4 decoration-[#3b4050]"
                        >
                          Details & Architecture
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard 6-Column Card */
                  <div className="p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#181a20] border border-[#262a35] mb-5">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-[#9e9992] mb-2">
                        <span className="uppercase tracking-wider text-[#c99558]">
                          {project.categoryLabel}
                        </span>
                        <span className="text-[11px] text-[#69655f]">Active Architecture</span>
                      </div>

                      <h3 className="font-serif text-2xl text-[#f4efea] mb-3 group-hover:text-[#c99558] transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm font-sans text-[#9e9992] leading-relaxed mb-5">
                        {project.description}
                      </p>

                      <div className="mb-6">
                        <ProjectTags tags={project.tags} size="xs" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#20232b]">
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-[#181a20] hover:bg-[#20232b] text-[#f4efea] border border-[#262933] cursor-pointer"
                            aria-label={`View ${project.title} on GitHub`}
                          >
                            <GitHubIcon className="w-4 h-4 text-[#c99558]" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-[#181a20] hover:bg-[#20232b] text-[#c99558] border border-[#262933] cursor-pointer"
                            aria-label={`Open live link for ${project.title}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs font-mono text-[#c99558] hover:text-[#dfb27c] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Examine Specs</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>

      {/* Project Detail Modal with AnimatePresence */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className="relative z-10 w-full max-w-2xl bg-[#121418] border border-[#2d313d] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[88vh]"
            >
              <div className="flex items-start justify-between pb-4 border-b border-[#20232b] mb-6">
                <div>
                  <span className="text-xs font-mono text-[#c99558] uppercase tracking-wider block mb-1">
                    {activeModalProject.categoryLabel}
                  </span>
                  <h3 className="font-serif text-3xl text-[#f4efea]">
                    {activeModalProject.title}
                  </h3>
                  <p className="text-xs font-mono text-[#9e9992] mt-0.5">
                    {activeModalProject.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="w-9 h-9 rounded-lg bg-[#181a22] border border-[#272b35] hover:border-[#c99558]/50 flex items-center justify-center text-[#9e9992] hover:text-[#f4efea] cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Extended Architecture Blueprint */}
              <div className="space-y-6 text-sm text-[#9e9992] font-sans leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#f4efea] mb-2">
                    System Architecture & Design Decisions
                  </h4>
                  <p>{activeModalProject.extendedDetails}</p>
                </div>

                <ProjectMetrics metrics={activeModalProject.metrics} size="md" />

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#f4efea] mb-2">
                    Technologies Deployed
                  </h4>
                  <ProjectTags tags={activeModalProject.tags} highlight />
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="mt-8 pt-4 border-t border-[#20232b] flex items-center justify-between">
                <span className="text-xs font-mono text-[#69655f]">Repository Status: Public & Audited</span>
                <div className="flex items-center gap-3">
                  {activeModalProject.githubUrl && (
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-[#181a20] hover:bg-[#20232a] text-[#f4efea] border border-[#272b35] text-xs font-mono flex items-center gap-2"
                    >
                      <GitHubIcon className="w-3.5 h-3.5 text-[#c99558]" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-[#c99558] hover:bg-[#dfb27c] text-[#0b0c0e] text-xs font-semibold flex items-center gap-2"
                    >
                      <span>Launch App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
