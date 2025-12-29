"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export function SectionHeader({ title, subtitle, centered = false, light = false }: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      )

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            delay: 0.3,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isReady])

  return (
    <div ref={containerRef} className={`mb-16 ${centered ? "text-center" : ""}`}>
      <div className={`inline-flex items-center gap-4 mb-6 ${centered ? "justify-center" : ""}`}>
        <div ref={lineRef} className={`h-[3px] w-10 ${light ? "bg-[#C8102E]" : "bg-[#C8102E]"} origin-left`} />
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.25em] ${light ? "text-white/50" : "text-[#0B1F3B]/40"}`}
        >
          {title}
        </span>
        <div className={`h-[3px] w-10 ${light ? "bg-[#C8102E]" : "bg-[#C8102E]"} origin-right`} />
      </div>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${light ? "text-white" : "text-[#0B1F3B]"} text-balance`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-lg ${light ? "text-white/60" : "text-[#0B1F3B]/50"} max-w-2xl ${centered ? "mx-auto" : ""} font-light`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
