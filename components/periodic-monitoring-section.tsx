"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "./gsap-provider"
import { SectionHeader } from "./section-header"
import { AnimatedCard } from "./animated-card"
import { Calendar, ClipboardCheck, Truck, Archive, ArrowRight } from "lucide-react"

export function PeriodicMonitoringSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isReady } = useGSAP()

  const timeline = [
    {
      icon: Calendar,
      title: "Storage Inspections",
      text: "Scheduled facility assessments",
      image: "https://ik.imagekit.io/d9wt8plt0/screeningpic.jpeg",
    },
    {
      icon: ClipboardCheck,
      title: "Pre-Handling",
      text: "Verification before operations",
      image: "https://ik.imagekit.io/d9wt8plt0/screening.jpeg",
    },
    {
      icon: Truck,
      title: "Transport Events",
      text: "Before and after movement",
      image: "https://ik.imagekit.io/d9wt8plt0/screening2.jpeg",
    },
    {
      icon: Archive,
      title: "Extended Storage",
      text: "Prior to disposal or long-term",
      image: "https://ik.imagekit.io/d9wt8plt0/a4jpeg.jpeg",
    },
  ]

  return (
    <section ref={sectionRef} id="periodic-monitoring" className="py-18 lg:py-16 bg-[#0B1F3B] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#b91c1c]/10 blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionHeader
              title="Periodic Condition Monitoring"
              subtitle="Integrated monitoring for proactive safety management"
              light
              centered
            />
          </div>

          <p className="text-xl text-white/60 leading-relaxed mb-20 max-w-4xl mx-auto text-center font-light font-display">
            Canada Ordnance Safety integrates periodic stabilizer monitoring into operational safety programs. Regular
            checks provide trend visibility, enabling proactive interventions aligned with safety regulations.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, index) => (
              <AnimatedCard key={index} index={index}>
                <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 h-full overflow-hidden">
                  {item.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3B] via-[#0B1F3B]/50 to-transparent" />
                      
                      {/* Disclaimer */}
                      <div className="absolute bottom-0 left-0 right-0 py-2 px-3 bg-gradient-to-t from-black/70 to-transparent">
                        <span className="text-[10px] text-white/20 italic">
                          *For representation purposes only
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-8 relative">
                    <span className="absolute top-4 right-4 text-5xl font-bold text-white/[0.03] group-hover:text-[#b91c1c]/20 transition-colors duration-500 font-display">
                      0{index + 1}
                    </span>

                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-[#b91c1c] flex items-center justify-center mb-6 shadow-lg shadow-[#b91c1c]/20">
                        <item.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 font-display">{item.title}</h3>
                      <p className="text-white/50 font-light font-display">{item.text}</p>

                      
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#b91c1c] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Bottom CTA */}
      
<div className="mt-20 text-center">
  <button
    onClick={(e) => {
      e.preventDefault()
      const target = document.querySelector('#contact')
      if (target) {
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        })
      }
    }}
    className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#0B1F3B] font-semibold hover:bg-[#b91c1c] hover:text-white transition-all duration-300 shadow-xl shadow-black/20 group font-display cursor-pointer"
  >
    Request a Monitoring Assessment
    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
  </button>
</div>
        </div>
      </div>
    </section>
  )
}