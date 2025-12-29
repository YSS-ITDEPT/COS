"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { SectionHeader } from "./section-header"
import { Wind, Shield, ClipboardCheck } from "lucide-react"

export function OperationalUseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".op-card")
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
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
      title: "Non-invasive Air Sampling",
      body: "Sampling is performed around stored or handled items without opening or disturbing materials, supporting safer assessment in operational settings.",
      Icon: Wind,
      number: "01",
      image: "https://ik.imagekit.io/d9wt8plt0/screening.jpeg",
    },
    {
      title: "Early Warning Indicators",
      body: "Detection of stabilizers and degradation products provides earlier insight into chemical change compared to visual inspection alone.",
      Icon: Shield,
      number: "02",
      image: "https://ik.imagekit.io/d9wt8plt0/screeningpic.jpeg",
    },
    {
      title: "Decision Support",
      body: "Results can inform risk screening, prioritization, and safe handling/disposal planning under established procedures.",
      Icon: ClipboardCheck,
      number: "03",
      image: "https://ik.imagekit.io/d9wt8plt0/screening2.jpeg",
    },
  ]

  return (
    <section ref={sectionRef} id="operational-use" className="py-28 lg:py-36 bg-[#08162D] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent rotate-[60deg]" />
        <div className="absolute bottom-1/3 right-1/3 w-px h-48 bg-gradient-to-b from-transparent via-[#C8102E]/[0.05] to-transparent -rotate-[30deg]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <SectionHeader
              title="Operational Use"
              subtitle="How AACTS supports disposal-focused safety operations"
              centered
              light
            />
          </div>

          <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
            {cards.map((card, index) => {
              const { Icon } = card
              return (
                <div
                  key={index}
                  className="op-card group relative bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 rounded-none"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08162D] via-[#08162D]/50 to-transparent" />
                    {/* Number overlay */}
                    <div className="absolute top-4 right-4 text-5xl font-bold text-white/10 font-display">
                      {card.number}
                    </div>
                  </div>

                  <div className="p-8 relative z-10">
                    <div className="mb-6 w-14 h-14 bg-[#C8102E] flex items-center justify-center rounded-none">
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 font-display">{card.title}</h3>
                    <p className="text-white/60 leading-relaxed font-display">{card.body}</p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C8102E] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
