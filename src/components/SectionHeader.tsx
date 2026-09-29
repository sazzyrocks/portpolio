import React from "react"

interface SectionHeaderProps {
  eyebrow: string
  title: string
  badge?: string
  children?: React.ReactNode
  className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  badge,
  children,
  className = "mb-16",
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#20232b] ${className}`}
    >
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#c99558] mb-2 block">
          {eyebrow}
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#f4efea] tracking-tight">
          {title}
        </h2>
      </div>

      {children ? (
        children
      ) : badge ? (
        <span className="font-mono text-xs text-[#69655f] shrink-0">
          [{badge}]
        </span>
      ) : null}
    </div>
  )
}
