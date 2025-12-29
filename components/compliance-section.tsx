"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { SectionHeader } from "./section-header"
import { ShieldCheck, FileCheck, Scale, Award } from "lucide-react"

export function ComplianceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
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

  const pillars = [
    { icon: ShieldCheck, label: "Safety Standards" },
    { icon: FileCheck, label: "Regulatory Compliance" },
    { icon: Scale, label: "Legal Framework" },
    { icon: Award, label: "Best Practices" },
  ]

  return (
    <section ref={sectionRef} id="compliance" className="py-28 lg:py-36 bg-[#F4F6F9] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0B1F3B]/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div ref={contentRef}>
            <div className="text-center mb-16">
              <SectionHeader
                title="Safety and Regulatory Alignment"
                subtitle="Operating within established frameworks for energetic materials"
                centered
              />
            </div>

            <div className="bg-white p-10 lg:p-16 shadow-xl shadow-[#0B1F3B]/5 border border-[#0B1F3B]/5 relative overflow-hidden">
              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B1F3B] via-[#b91c1c] to-[#0B1F3B]" />

              <p className="text-xl lg:text-2xl leading-relaxed text-[#0B1F3B]/70 font-light text-center mb-16 font-display">
                Canada Ordnance Safety operates within established safety, transport, and handling regulations
                applicable to energetic materials. Stabilizer monitoring supports compliance by providing additional
                chemical condition awareness within existing safety frameworks.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {pillars.map((pillar, index) => (
                  <div
                    key={index}
                    className="group flex flex-col items-center text-center p-6 hover:bg-[#F4F6F9] transition-colors duration-300"
                  >
                    <div className="w-16 h-16 bg-[#0B1F3B] flex items-center justify-center mb-4 group-hover:bg-[#b91c1c] transition-colors duration-300">
                      <pillar.icon className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-[#0B1F3B]/70 uppercase tracking-wider font-display">
                      {pillar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-[#0B1F3B]/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#b91c1c]" />
                <span className="text-sm uppercase tracking-wider font-display">Canadian Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#b91c1c]" />
                <span className="text-sm uppercase tracking-wider font-display">Industry Best Practices</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#b91c1c]" />
                <span className="text-sm uppercase tracking-wider font-display">Proven Technology</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
