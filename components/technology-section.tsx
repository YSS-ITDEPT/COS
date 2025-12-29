"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { SectionHeader } from "./section-header"
import { Atom, Clock, Beaker, Gauge } from "lucide-react"

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".tech-card")
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        )
      })

      gsap.fromTo(
        ".product-image",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".product-image", start: "top 80%" },
        },
      )

      gsap.fromTo(
        ".workflow-image",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".workflow-image", start: "top 85%" },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  const techFeatures = [
    {
      icon: Clock,
      title: "Real-Time Detection",
      description: "Detection of trace explosive vapors within approximately 20 seconds by air sampling",
    },
    {
      icon: Atom,
      title: "Molecular Analysis",
      description: "Particularly suited for monitoring nitrocellulose-based propellants and high explosives",
    },
    {
      icon: Beaker,
      title: "Target Analytes",
      description: "Stabilizers such as Diphenylamine (DPA), Ethyl Centralite (EC), and Akardite (AK)",
    },
    {
      icon: Gauge,
      title: "Degradation Markers",
      description: "Detection of markers that may indicate evolving chemical instability",
    },
  ]

  return (
    <section ref={sectionRef} id="technology" className="py-28 lg:py-36 bg-white relative bg-grain">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <SectionHeader
              title="AACTS Technology"
              subtitle="Advanced analytical capabilities for real-time chemical detection"
              centered
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="product-image relative">
              <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 p-8 lg:p-12 flex items-center justify-center">
                <Image
                  src="https://ik.imagekit.io/d9wt8plt0/product.png"
                  alt="AACTS Detection Device - Advanced Chemical Threat Detection System"
                  width={500}
                  height={400}
                  className="w-full max-w-md h-auto object-contain"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#b91c1c] text-white px-4 py-2">
                <span className="text-xs font-bold uppercase tracking-wider font-display">AACTS 3000</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-semibold text-[#0B1F3B] mb-6 font-display">
                Advanced Chemical Detection System
              </h3>
              <p className="text-lg text-[#0B1F3B]/70 leading-relaxed mb-6">
                AACTS enables real-time detection of trace explosive vapors, stabilizers, and degradation products. It
                employs cutting-edge ion mobility spectrometry to provide rapid and accurate chemical analysis.
              </p>
              <p className="text-[#0B1F3B]/60 leading-relaxed">
                Our detection system is designed for field deployment in ammunition depots, storage facilities, and
                operational environments where ordnance integrity must be verified without risk.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {techFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="tech-card group relative bg-[#F4F6F9] p-8 border border-[#0B1F3B]/10 hover:border-[#0B1F3B]/20 transition-all duration-300 hover:shadow-[0_8px_40px_-12px_rgba(11,31,59,0.1)] rounded-none"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#0B1F3B] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="mb-6 w-14 h-14 bg-[#0B1F3B] flex items-center justify-center group-hover:bg-[#C8102E] transition-colors duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-[#0B1F3B] mb-3 font-display">{feature.title}</h3>
                  <p className="text-sm text-[#0B1F3B]/60 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>

          <div className="workflow-image">
            <h3 className="text-sm font-semibold text-[#0B1F3B]/50 uppercase tracking-widest mb-8 text-center font-display">
              System Workflow
            </h3>
            <div className="relative border border-[#0B1F3B]/10 overflow-hidden">
              <Image
                src="/images/workflow-20.png"
                alt="System Workflow: Real-Time Chemical Threat Detection - Sample Acquisition, Ionization Source, Ion Mobility Drift Tube, Signal Processing"
                width={1400}
                height={600}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
