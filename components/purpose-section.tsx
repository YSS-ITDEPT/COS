"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { SectionHeader } from "./section-header"
import { Target, Eye, ShieldCheck } from "lucide-react"

export function PurposeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
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
        cardRef.current,
        { opacity: 0, x: 50 },
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

      // Animate list items
      gsap.fromTo(
        cardRef.current?.querySelectorAll(".list-item"),
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.5,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  const purposes = [
    {
      icon: Target,
      text: "Explosives storage and handling environments",
    },
    {
      icon: Eye,
      text: "Condition monitoring to support disposal decision workflows",
    },
    {
      icon: ShieldCheck,
      text: "Risk reduction through earlier visibility into chemical instability indicators",
    },
  ]

  return (
    <section ref={sectionRef} id="purpose" className="py-28 lg:py-36 bg-[#F4F6F9] relative overflow-hidden bg-grain">
      <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none">
        <svg
          className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-[0.025] text-[#0B1F3B]"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50 5L53.5 15.5L58 12L56.5 22L68 20L58 28L70 32L60 38L75 50L58 52L65 65L52 56V75L50 65L48 75V56L35 65L42 52L25 50L40 38L30 32L42 28L32 20L43.5 22L42 12L46.5 15.5L50 5Z" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left content */}
          <div ref={contentRef}>
            <SectionHeader title="Purpose" />
            <p className="text-lg lg:text-xl leading-[1.7] text-[#0B1F3B]/70 font-light font-display">
              Canada Ordnance Safety applies advanced vapour-phase chemical sensing technology to enhance situational
              awareness when managing energetic materials. By analyzing the air around munitions, the system supports
              early identification of stabilizers and degradation markers associated with chemical change, enabling
              proactive safety actions before visual or thermal indicators are observed.
            </p>
          </div>

          {/* Right card - updated radius to 16px and softer shadow */}
          <div
            ref={cardRef}
            className="bg-white border border-[#0B1F3B]/10 p-10 lg:p-12 shadow-[0_8px_40px_-12px_rgba(11,31,59,0.12)] relative rounded-2xl"
          >
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-[3px] border-l-[3px] border-[#b91c1c] rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[3px] border-r-[3px] border-[#0B1F3B] rounded-br-2xl" />

            <h3 className="text-lg font-bold text-[#0B1F3B] mb-8 uppercase tracking-wider font-display">
              Primary Use Context
            </h3>

            <div className="space-y-6">
              {purposes.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="list-item flex items-start gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#0B1F3B] flex items-center justify-center group-hover:bg-[#b91c1c] transition-colors duration-300 rounded-lg">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-[#0B1F3B]/80 leading-relaxed pt-2 font-display">{item.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
