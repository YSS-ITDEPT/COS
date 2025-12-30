"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { SectionHeader } from "./section-header"
import { AlertCircle, Zap, Target, Workflow, Box, Activity, ChevronRight, Shield } from "lucide-react"

export function SystemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()
  const [activeRing, setActiveRing] = useState(0)

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } },
      )

      const specs = specsRef.current?.querySelectorAll(".spec-row")
      specs?.forEach((spec, index) => {
        gsap.fromTo(
          spec,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: 0.3 + index * 0.1,
            scrollTrigger: { trigger: specsRef.current, start: "top 80%" },
          },
        )
      })

      gsap.fromTo(
        ".system-product-image",
        { opacity: 0, scale: 0.9, rotateY: -10 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".system-product-image", start: "top 80%" },
        },
      )
    }, sectionRef)

    const interval = setInterval(() => {
      setActiveRing((prev) => (prev + 1) % 4)
    }, 1500)

    return () => {
      ctx.revert()
      clearInterval(interval)
    }
  }, [isReady])

  const specs = [
    { key: "Technology", value: "AACTS-Axial Ion Mobility Spectrometry", icon: Zap },
    { key: "Sensitivity", value: "Nanogram to picogram range", icon: Target },
    { key: "Sampling Method", value: "Non-invasive air sampling", icon: Workflow },
    { key: "Operational Use", value: "Storage, handling, transport staging", icon: Box },
  ]

  const metrics = [
    { label: "Sample Time", value: "1-3 min", description: "Rapid Analysis" },
    { label: "Detection Range", value: "ng-pg", description: "Nanogram to Picogram" },
    { label: "Scan Time", value: "20 sec", description: "Minimal Requirement" }
  ]

  return (
    <section ref={sectionRef} id="system" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Complex Thematic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top border accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c8102e] to-transparent opacity-30" />
        
        {/* Technical grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0a1628 1px, transparent 1px),
              linear-gradient(to bottom, #0a1628 1px, transparent 1px)
            `,
            backgroundSize: "80px 60px",
          }}
        />
        
     
        
        {/* Large maple leaf watermarks */}
        <div className="absolute -top-10 left-0 w-[360px] h-[360px] lg:w-[520px] lg:h-[520px] opacity-[0.02]">
          <Image
            src="https://ik.imagekit.io/d9wt8plt0/c7bae004-d48f-4415-be24-c11e6743d09d.png"
            alt=""
            width={520}
            height={520}
            className="w-full h-full object-contain"
          />
        </div>
    
        
        {/* Floating hexagonal patterns */}
        <svg className="absolute top-20 right-20 w-32 h-32 opacity-[0.03]" viewBox="0 0 100 100">
          <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="#0a1628" strokeWidth="1" />
          <polygon points="50,25 75,37.5 75,62.5 50,75 25,62.5 25,37.5" fill="none" stroke="#c8102e" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-32 left-32 w-24 h-24 opacity-[0.03] rotate-45" viewBox="0 0 100 100">
          <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="#c8102e" strokeWidth="1" />
        </svg>
        
        {/* Circuit board style lines */}
        <div className="absolute top-40 right-10 w-48 h-48 opacity-[0.02]">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M20,20 L180,20 L180,180 M20,60 L100,60 M140,60 L180,60 M100,60 L100,140 M140,100 L180,100" 
                  stroke="#0a1628" strokeWidth="2" fill="none" />
            <circle cx="20" cy="20" r="4" fill="#c8102e" />
            <circle cx="180" cy="20" r="4" fill="#c8102e" />
            <circle cx="100" cy="60" r="4" fill="#c8102e" />
            <circle cx="100" cy="140" r="4" fill="#c8102e" />
          </svg>
        </div>
        
        {/* Subtle gradient orbs for depth */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#0a1628]/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#c8102e]/[0.015] rounded-full blur-[100px]" />
        
        {/* Shield icon pattern */}
        <div className="absolute top-1/2 left-10 opacity-[0.015]">
          <Shield className="w-16 h-16 text-[#0a1628]" />
        </div>
        <div className="absolute top-1/4 right-1/4 opacity-[0.015] rotate-12">
          <Target className="w-12 h-12 text-[#c8102e]" />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div ref={contentRef}>
              <SectionHeader title="AACTS 3000 Analyzer" />

              <p className="text-lg leading-relaxed text-[#0a1628]/60 mb-10 font-display">
                The AACTS 3000 Analyzer employs Axial Ion Mobility Spectrometry (AIMS) for sensitive detection of
                stabilizer's chemical degradation indicators in air samples.
              </p>

              {/* Specs Card - No Border Radius */}
              <div ref={specsRef} className="bg-[#f8f9fa] overflow-hidden border-2 border-[#0a1628]/10 shadow-lg">
                <div className="bg-[#0a1628] px-6 py-4 flex items-center justify-between relative overflow-hidden">
                  {/* Technical pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 11px)`
                    }} />
                  </div>
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-8 h-8 bg-[#c8102e] flex items-center justify-center">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                      Technical Specifications
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 relative z-10">
                    <div className="w-2 h-2 bg-[#c8102e] animate-pulse" />
                    <span className="text-xs text-white/50 uppercase tracking-wider font-display">Active</span>
                  </div>
                </div>
                <div className="p-2 bg-white">
                  {specs.map((spec, index) => (
                    <div
                      key={index}
                      className="spec-row flex items-center gap-5 p-4 hover:bg-[#f8f9fa] transition-colors duration-300 group border-b border-[#0a1628]/5 last:border-b-0"
                    >
                      <div className="w-10 h-10 bg-[#0a1628] flex items-center justify-center flex-shrink-0 group-hover:bg-[#c8102e] transition-colors">
                        <spec.icon className="w-4 h-4 text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-medium text-[#0a1628]/40 uppercase tracking-widest block mb-1 font-display">
                          {spec.key}
                        </span>
                        <span className="text-[#0a1628] font-semibold text-sm font-display">{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Grid - No Border Radius */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {metrics.map((metric, i) => (
                  <div 
                    key={i} 
                    className="bg-[#0a1628] p-4 text-center border-l-4 border-[#c8102e] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default group relative overflow-hidden"
                  >
                    {/* Technical pattern */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 11px)`
                      }} />
                    </div>
                    <div className={`font-bold font-mono text-xl mb-1 transition-colors duration-300 relative z-10 ${
                      metric.label === "Forensic Level" ? "text-white/90 group-hover:text-white" : "text-[#c8102e] group-hover:text-[#ff3e5e]"
                    }`}>
                      {metric.value}
                    </div>
                    <div className={`text-[10px] uppercase tracking-wider font-medium font-display leading-tight transition-colors duration-300 relative z-10 ${
                      metric.label === "Forensic Level" ? "text-[#c8102e] group-hover:text-[#ff3e5e]" : "text-white/80 group-hover:text-white"
                    }`}>
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual - No Border Radius */}
            <div ref={visualRef} className="relative">
              <div className="system-product-image relative overflow-hidden border-2 border-[#0a1628]/10 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 lg:p-10 shadow-xl">
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#c8102e]" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#c8102e]" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#c8102e]" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#c8102e]" />
                
                <Image
                  src="https://ik.imagekit.io/d9wt8plt0/product.png"
                  alt="AACTS 3000 Analyzer - Advanced Chemical Threat Detection System"
                  width={600}
                  height={500}
                  className="w-full h-auto object-contain "
                />
                <div className="absolute top-4 right-4 bg-[#0a1628] text-white px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#c8102e] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider font-display">AACTS 3000</span>
                  </div>
                </div>
              </div>

              {/* Note Card - No Border Radius */}
              <div className="mt-4 bg-white border-l-4 border-[#c8102e] border-t border-r border-b border-[#0a1628]/10 p-5 relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8102e]/5 blur-2xl" />
                <div className="flex items-start gap-3 relative z-10">
                  <div className="w-8 h-8 bg-[#c8102e]/10 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-4 w-4 text-[#c8102e]" />
                  </div>
                  <div>
                    <h4 className="text-[#0a1628] font-semibold mb-1 text-sm font-display">AACTS 3000 Analyzer</h4>
                    <p className="text-[#0a1628]/50 text-sm leading-relaxed font-display">
                      For chemical analysis of stabilizer's  degradation indicators in energetic materials.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}