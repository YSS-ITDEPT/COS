"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { SectionHeader } from "./section-header"
import Image from "next/image"

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      )

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      )

      // Animate table rows
      const rows = leftRef.current?.querySelectorAll(".spec-row")
      rows?.forEach((row, index) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: 0.4 + index * 0.1,
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      })

      // Animate tags
      const tags = rightRef.current?.querySelectorAll(".substance-tag")
      tags?.forEach((tag, index) => {
        gsap.fromTo(
          tag,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: 0.5 + index * 0.05,
            scrollTrigger: {
              trigger: rightRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  const specifications = [
    { key: "Technology", value: "AACTS®-AIMS" },
    { key: "Sensitivity", value: "Nanogram to picogram levels" },
    { key: "Analysis Time", value: "10–20 seconds (fast cycle)" },
    { key: "Weight", value: "17 kg (37.5 lbs)" },
    { key: "Dimensions", value: "40 × 39 × 34 cm" },
  ]

  const narcotics = ["Heroin", "Fentanyl", "Cocaine", "MDMA", "Marijuana"]
  const explosives = ["NG", "AN", "DNT", "TNT", "RDX", "PETN", "TATP", "HMTD"]

  return (
    <section ref={sectionRef} id="capabilities" className="py-28 lg:py-36 bg-[#F4F6F9] relative bg-grain overflow-hidden">
      {/* Maple Leaf Background - Right Side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-[0.03]">
        <Image
          src="https://ik.imagekit.io/d9wt8plt0/c7bae004-d48f-4415-be24-c11e6743d09d.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.02] text-[#0B1F3B]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50 5L53.5 15.5L58 12L56.5 22L68 20L58 28L70 32L60 38L75 50L58 52L65 65L52 56V75L50 65L48 75V56L35 65L42 52L25 50L40 38L30 32L42 28L32 20L43.5 22L42 12L46.5 15.5L50 5Z" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <SectionHeader title="Capabilities and Specifications" centered />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Technical Specifications - updated with rounded corners */}
            <div
              ref={leftRef}
              className="bg-white border border-[#0B1F3B]/10 overflow-hidden rounded-2xl shadow-[0_8px_40px_-12px_rgba(11,31,59,0.1)]"
            >
              <div className="bg-[#0B1F3B] px-8 py-5">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">Technical Specifications</h3>
              </div>
              <div className="p-8">
                <div className="space-y-0">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="spec-row flex justify-between items-center py-4 border-b border-[#0B1F3B]/10 last:border-0"
                    >
                      <span className="text-sm font-medium text-[#0B1F3B]/60 uppercase tracking-wider">{spec.key}</span>
                      <span className="text-[#0B1F3B] font-semibold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Detected Substances - updated with rounded corners */}
            <div
              ref={rightRef}
              className="bg-white border border-[#0B1F3B]/10 overflow-hidden rounded-2xl shadow-[0_8px_40px_-12px_rgba(11,31,59,0.1)]"
            >
              <div className="bg-[#C8102E] px-8 py-5">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">Detected Substance Classes</h3>
              </div>
              <div className="p-8">
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1F3B]/50 mb-4">
                    Narcotics (examples)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {narcotics.map((item, index) => (
                      <span
                        key={index}
                        className="substance-tag px-4 py-2 bg-[#0B1F3B]/5 border border-[#0B1F3B]/10 text-sm text-[#0B1F3B]/80 hover:bg-[#0B1F3B] hover:text-white transition-colors duration-300 cursor-default rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B1F3B]/50 mb-4">
                    Explosives (examples)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {explosives.map((item, index) => (
                      <span
                        key={index}
                        className="substance-tag px-4 py-2 bg-[#C8102E]/5 border border-[#C8102E]/20 text-sm text-[#0B1F3B]/80 hover:bg-[#C8102E] hover:text-white transition-colors duration-300 cursor-default rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-8 text-xs text-[#0B1F3B]/40 italic">Presented as examples; not an exhaustive list.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}