"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { AlertCircle, Clock, FileWarning, Truck, Package, Wrench } from "lucide-react"

export function WhyStabilizersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(".challenge-parallax", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Header elements
      gsap.fromTo(
        ".challenge-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      )

      // Title word reveal
      gsap.fromTo(
        ".challenge-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      )

      // Problem statement with blur
      gsap.fromTo(
        ".problem-statement",
        { opacity: 0, filter: "blur(8px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          scrollTrigger: { trigger: ".problem-statement", start: "top 80%" },
        },
      )

      // Challenge items stagger
      gsap.fromTo(
        ".challenge-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".challenge-item", start: "top 85%" },
        },
      )

      // Methods cards flip-in
      gsap.fromTo(
        ".method-card",
        { opacity: 0, rotateY: -30, scale: 0.9 },
        {
          opacity: 1,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".method-card", start: "top 85%" },
        },
      )

      // Right card 3D entrance
      gsap.fromTo(
        ".risk-card",
        { opacity: 0, x: 60, rotateY: -10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".risk-card", start: "top 80%" },
        },
      )

      // Risk area items stagger
      gsap.fromTo(
        ".risk-item",
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: ".risk-item", start: "top 85%" },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  const challenges = [
    "Ordnance ages chemically even when unused",
    "Stabilizers inside propellants get depleted over time",
    "Decomposition generates trace chemical vapours",
    "These changes are often invisible until failure occurs",
  ]

  const currentMethods = [
    { text: "Periodic inspections", issue: "Not continuous" },
    { text: "Non-Destructive testing", issue: "Consumes samples" },
    { text: "Proactive approach", issue: "Not predictive" },
  ]

  const riskAreas = [
    { icon: Package, label: "Storage" },
    { icon: Truck, label: "Transportation" },
    { icon: Wrench, label: "Handling" },
    { icon: FileWarning, label: "Disposal" },
  ]

  return (
    <section ref={sectionRef} id="challenge" className="py-10 lg:py-18 bg-slate-50 relative overflow-hidden">
      <div className="challenge-parallax absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-100 to-transparent" />
        {/* Maple Leaf Background */}
        <div className="absolute -top-10 left-0 w-[350px] h-[350px] lg:w-[550px] lg:h-[550px] opacity-[0.04]">
          <Image
            src="https://ik.imagekit.io/d9wt8plt0/c7bae004-d48f-4415-be24-c11e6743d09d.png"
            alt=""
            width={550}
            height={550}
            className="w-full h-full object-contain"
          />
        </div>
    
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="challenge-line h-px w-12 bg-[#b91c1c] origin-left" />
              <span className="text-sm font-medium text-[#b91c1c] uppercase tracking-wider font-display">
                The Safety Challenge
              </span>
            </div>
            <h2 className="challenge-title text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0a1628] mb-6 max-w-3xl font-display">
              The Core Problem We Address
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Left - Problem Statement */}
            <div className="space-y-6" style={{ perspective: "1000px" }}>
              <div className="problem-statement">
                <p className="text-lg text-slate-700 leading-relaxed mb-6 font-display">
                  Canada stores and handles large quantities of legacy ammunition, missiles and rocket motors, artillery
                  shells, propellants, and energetic materials stored over extended periods.
                </p>
              </div>

              {/* Challenges List */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[#0a1628] uppercase tracking-wider mb-4 font-display">
                  Existing Challenges
                </h3>
                {challenges.map((challenge, i) => (
                  <div
                    key={i}
                    className="challenge-item flex items-start gap-3 p-4 bg-white border border-slate-200 transition-all duration-300 hover:border-[#b91c1c]/30 hover:shadow-md"
                  >
                    <AlertCircle className="w-5 h-5 text-[#b91c1c] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-display">{challenge}</span>
                  </div>
                ))}
              </div>

              {/* Current Methods Issues */}
              <div style={{ perspective: "1000px" }}>
                <h3 className="text-sm font-semibold text-[#0a1628] uppercase tracking-wider mb-4 font-display">
                  Current Inspection Methods
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentMethods.map((method, i) => (
                    <div
                      key={i}
                      className="method-card p-4 bg-[#0a1628] text-center transition-transform duration-300 hover:scale-105"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="text-sm font-medium text-white mb-1 font-display">{method.text}</div>
                      <div className="text-xs text-[#b91c1c] font-display">{method.issue}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Risk Areas */}
            <div className="risk-card" style={{ perspective: "1000px" }}>
              <div className="bg-white border border-slate-200 p-8 lg:p-10 h-full transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-5 h-5 text-[#b91c1c]" />
                  <h3 className="text-lg font-semibold text-[#0a1628] font-display">Risk During Operations</h3>
                </div>

                <p className="text-slate-600 mb-6 leading-relaxed font-display">
                  Chemical degradation creates risk across the entire ordnance lifecycle. Without continuous monitoring,
                  critical safety thresholds may be crossed undetected.
                </p>

             <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                  {riskAreas.map((area, i) => (
                    <div
                      key={i}
                      className="risk-item flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-slate-50 border border-slate-100 transition-all duration-300 hover:border-[#b91c1c]/30 hover:bg-white group cursor-default"
                    >
                      <div className="w-10 h-10 bg-[#b91c1c]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#b91c1c]/20 group-hover:scale-110">
                        <area.icon className="w-5 h-5 text-[#b91c1c]" />
                      </div>
                      <span className="font-medium text-[#0a1628] font-display text-sm sm:text-base text-center sm:text-left">{area.label}</span>
                    </div>
                  ))}
                </div>

                {/* Solution Preview */}
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-500 mb-2 font-display">Our Solution</p>
                  <p className="text-base font-semibold text-[#0a1628] font-display">
                    We assess ordnance safety by detecting and analysing trace chemical vapours in the surrounding
                    air—non-invasively, in real time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}