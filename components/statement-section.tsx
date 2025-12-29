"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { Shield } from "lucide-react"

export function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 bg-white relative bg-grain">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div ref={quoteRef} className="relative bg-[#F4F6F9] border-l-4 border-[#0B1F3B] p-12 lg:p-16 rounded-r-2xl">
            {/* Large quote mark */}
            <div className="absolute top-8 right-8 text-[120px] leading-none text-[#0B1F3B]/5 font-display">
              &ldquo;
            </div>

            <div className="flex items-center gap-3 mb-8">
              <Shield className="h-6 w-6 text-[#b91c1c]" />
              <span className="text-sm font-bold text-[#0B1F3B] uppercase tracking-wider font-display">
                Official Statement
              </span>
            </div>

            <p className="text-xl lg:text-2xl leading-[1.7] text-[#0B1F3B]/80 font-light relative z-10 font-display">
              Advanced vapour-phase chemical sensing technology is used by Canada Ordnance Safety as part of its
              safety-oriented processes for managing energetic materials, supporting monitoring and risk screening
              activities relevant to disposal planning and operational handling.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#0B1F3B]/10" />
              <span className="text-xs text-[#0B1F3B]/40 uppercase tracking-wider font-display">
                Canada Ordnance Safety Inc.
              </span>
              <div className="h-px flex-1 bg-[#0B1F3B]/10" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
