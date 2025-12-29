"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { SectionHeader } from "./section-header"
import { AnimatedCard } from "./animated-card"
import { AlertTriangle, Search, Activity, Beaker, ChevronRight } from "lucide-react"

export function StabilizersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelector(".intro-text"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  const whyMonitoring = [
    { icon: AlertTriangle, text: "Declining stabilizer levels indicate progressing chemical degradation" },
    { icon: Search, text: "Early detection supports risk-based storage and transport decisions" },
    { icon: Activity, text: "Chemical indicators appear before visual or thermal warning signs" },
  ]

  const stabilizers = [
    { name: "Diphenylamine (DPA)", desc: "Primary stabilizer" },
    { name: "Ethyl Centralite (EC)", desc: "Dual-purpose stabilizer" },
    { name: "Akardite compounds", desc: "Advanced stabilizers" },
    { name: "Degradation by-products", desc: "Condition indicators" },
  ]

  return (
    <section ref={sectionRef} id="stabilizers" className="py-28 lg:py-36 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0B1F3B 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0B1F3B]/10 to-transparent" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] opacity-[0.03]">
          <Image src="/images/maple-leaf.png" alt="" fill className="object-contain" />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Role of Stabilizers in Energetic Materials"
            subtitle="Understanding chemical stability for safer operations"
          />

          <div className="intro-text relative pl-8 border-l-4 border-[#C8102E] mb-20 max-w-4xl">
            <p className="text-xl lg:text-2xl text-[#0B1F3B]/70 leading-relaxed font-light">
              Nitrocellulose-based propellants and certain high explosives rely on chemical stabilizers to inhibit
              autocatalytic decomposition. Over time, stabilizers are consumed as they neutralize reactive nitrogen
              oxides formed during material aging.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Why Stabilizer Monitoring Matters */}
            <AnimatedCard index={0}>
              <div className="bg-[#F4F6F9] p-10 lg:p-12 rounded-none h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0B1F3B] to-[#0B1F3B]/50" />

                <div className="flex items-center gap-3 mb-10">
                  <div className="w-3 h-3 bg-[#C8102E] rotate-45" />
                  <h3 className="text-sm font-bold text-[#0B1F3B] uppercase tracking-widest">
                    Why Stabilizer Monitoring Matters
                  </h3>
                </div>

                <div className="space-y-6">
                  {whyMonitoring.map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-5 p-5 bg-white rounded-none hover:shadow-lg hover:shadow-[#0B1F3B]/5 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-[#0B1F3B] flex items-center justify-center flex-shrink-0 rounded-none group-hover:bg-[#C8102E] transition-colors duration-300">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-[#0B1F3B]/70 pt-2 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>

            {/* Common Stabilizers Monitored */}
            <AnimatedCard index={1}>
              <div className="bg-[#0B1F3B] p-10 lg:p-12 rounded-none h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#C8102E]/10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5" />

                <div className="flex items-center gap-3 mb-10 relative z-10">
                  <div className="w-3 h-3 bg-[#C8102E] rotate-45" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                    Common Stabilizers Monitored
                  </h3>
                </div>

                <div className="space-y-4 relative z-10">
                  {stabilizers.map((stabilizer, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-5 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-none hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-[#C8102E]/20 flex items-center justify-center flex-shrink-0 rounded-none group-hover:bg-[#C8102E]/40 transition-colors">
                        <Beaker className="h-6 w-6 text-[#C8102E]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{stabilizer.name}</p>
                        <p className="text-white/50 text-sm">{stabilizer.desc}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-[#C8102E] group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  )
}
