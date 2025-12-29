"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { SectionHeader } from "./section-header"
import { Activity, BarChart3, Wrench } from "lucide-react"

export function AssuranceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".assurance-card")
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotateY: -5 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  const cards = [
    {
      title: "Ion Mobility Spectrometry",
      body: "Fast-switching detection supports timely assessment of potential threats in operational workflows.",
      Icon: Activity,
    },
    {
      title: "Real-Time Metrics Monitoring",
      body: "Continuous monitoring supports consistent performance and operational readiness.",
      Icon: BarChart3,
    },
    {
      title: "Onboard Diagnostics",
      body: "Built-in diagnostics help maintain device health and minimize downtime.",
      Icon: Wrench,
    },
  ]

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 bg-white relative bg-grain">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <SectionHeader title="System Assurance" centered />
          </div>

          <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
            {cards.map((card, index) => {
              const { Icon } = card
              return (
                <div
                  key={index}
                  className="assurance-card group relative bg-[#F4F6F9] border border-transparent hover:border-[#0B1F3B]/20 p-10 transition-all duration-300 rounded-2xl"
                >
                  {/* Animated border */}
                  <div className="absolute inset-0 border-2 border-[#0B1F3B] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  <div className="relative z-10">
                    <div className="mb-6 w-16 h-16 border-2 border-[#0B1F3B] flex items-center justify-center group-hover:bg-[#0B1F3B] transition-colors duration-300 rounded-xl">
                      <Icon className="h-7 w-7 text-[#0B1F3B] group-hover:text-white transition-colors duration-300" />
                    </div>

                    <h3 className="text-xl font-bold text-[#0B1F3B] mb-4">{card.title}</h3>
                    <p className="text-[#0B1F3B]/60 leading-relaxed">{card.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
