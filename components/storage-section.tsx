"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { Warehouse, Wind, Cpu, ShieldCheck, AlertTriangle, Clock, ArrowRight, Activity } from "lucide-react"

export function StorageSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(".storage-parallax", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.fromTo(
        ".storage-fade",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      )

      gsap.fromTo(
        ".process-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: { trigger: processRef.current, start: "top 80%" },
        },
      )

      gsap.fromTo(
        ".process-step",
        { opacity: 0, scale: 0.8, rotateY: -20 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: processRef.current, start: "top 75%" },
        },
      )

      gsap.fromTo(
        ".risk-card-storage",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".risk-card-storage", start: "top 85%" },
        },
      )

      gsap.to(".pulse-ring", {
        scale: 1.5,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: "power2.out",
      })

      gsap.fromTo(
        ".storage-image",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".storage-image", start: "top 80%" },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const processSteps = [
    {
      icon: Warehouse,
      title: "Storage Facility",
      subtitle: "Ordnance storage environment",
      desc: "Ammunition magazines and storage facilities housing ageing ordnance",
    },
    {
      icon: Wind,
      title: "Air Sampling",
      subtitle: "Non-invasive collection",
      desc: "Ambient air sampling around stored ordnance without physical contact",
    },
    {
      icon: Cpu,
      title: "Chemical Analysis",
      subtitle: "AACTS/IMS detection",
      desc: "Trace Chemical Detection(TCD) of stabiliser markers and degradation indicators",
    },
    {
      icon: ShieldCheck,
      title: "Safety Status",
      subtitle: "Actionable intelligence",
      desc: "Clear assessment of ordnance condition for safety decisions",
    },
  ]

  const risks = [
    {
      icon: AlertTriangle,
      title: "Chemical Ageing",
      desc: "Propellants and explosives undergo continuous chemical degradation over storage lifetime",
    },
    {
      icon: Activity,
      title: "Stabiliser Depletion",
      desc: "Critical stabiliser compounds are consumed as they neutralise reactive decomposition by-products",
    },
    {
      icon: Clock,
      title: "Extended Storage",
      desc: "Long-term storage of legacy ammunition without condition visibility increases uncertainty",
    },
  ]

  const outcomes = [
    "Early warning of chemical instability before critical thresholds",
    "Enhanced safety margins during extended storage periods",
    "Data-driven support for preventive safety decisions",
    "Reduced risk of unplanned incidents in storage facilities",
  ]

  return (
    <section
      ref={sectionRef}
      id="storage-safety"
      className="py-24 lg:py-32 bg-gradient-to-b from-[#0a1628] via-[#0d1a2d] to-[#0a1628] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="storage-parallax absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#b91c1c]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="storage-fade mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#b91c1c]" />
              <span className="text-sm font-medium text-[#b91c1c] uppercase tracking-widest font-display">
                Storage Assessment
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-[1.1] font-display">
              Ordnance Storage
              <br />
              <span className="text-white/60">Safety Assessment</span>
            </h2>
            <p className="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-3xl">
              Long-term storage of ammunition and explosives presents inherent safety challenges. Our non-invasive
              approach provides continuous condition visibility without disrupting storage operations or compromising
              ordnance integrity.
            </p>
          </div>

          <div className="storage-fade grid lg:grid-cols-2 gap-6 mb-20">
  <div className="storage-image relative overflow-hidden group">
    <Image
      src="https://ik.imagekit.io/d9wt8plt0/storage.jpeg"
      alt="Canadian Ammunition Storage Warehouse - Artillery shells and ordnance stored in racks"
      width={700}
      height={450}
      className="w-full h-[300px] lg:h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
    <div className="absolute bottom-5 left-4 right-4">
      <span className="text-xs font-medium text-[#b91c1c] uppercase tracking-wider font-display">
        Field Deployment
      </span>
      <h4 className="text-lg font-semibold text-white font-display">Ammunition Storage Facility</h4>
    </div>
    
    {/* Disclaimer */}
    <div className="absolute bottom-0 left-0 right-0 py-2 px-3 bg-gradient-to-t from-black/70 to-transparent">
      <span className="text-[10px] text-white/20 italic">
        *For representation purposes only
      </span>
    </div>
  </div>
  
  <div className="storage-image relative overflow-hidden group">
    <Image
      src="https://ik.imagekit.io/d9wt8plt0/storagepicjpeg.jpeg"
      alt="Underground Ammunition Bunker - Secure ordnance storage environment"
      width={700}
      height={450}
      className="w-full h-[300px] lg:h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
    <div className="absolute bottom-5 left-4 right-4">
      <span className="text-xs font-medium text-[#b91c1c] uppercase tracking-wider font-display">
        Secure Environment
      </span>
      <h4 className="text-lg font-semibold text-white font-display">Underground Magazine Storage</h4>
    </div>
    
    {/* Disclaimer */}
    <div className="absolute bottom-0 left-0 right-0 py-2 px-3 bg-gradient-to-t from-black/70 to-transparent">
      <span className="text-[10px] text-white/20 italic">
        *For representation purposes only
      </span>
    </div>
  </div>
</div>

          {/* Why Storage is High-Risk */}
          <div className="storage-fade mb-20">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-8 font-display">
              The Storage Challenge
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {risks.map((risk, i) => (
                <div
                  key={i}
                  className="risk-card-storage group p-6 bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:bg-white/[0.04] hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 bg-[#b91c1c]/10 border border-[#b91c1c]/20 flex items-center justify-center mb-5 group-hover:bg-[#b91c1c]/20 transition-colors">
                    <risk.icon className="w-5 h-5 text-[#b91c1c]" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-3 font-display">{risk.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{risk.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Visualization */}
          <div ref={processRef} className="storage-fade mb-20">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-10 font-display">
              Assessment Process
            </h3>

            <div className="relative">
              {/* Desktop Process Flow */}
              <div className="hidden lg:block">
                <div className="flex items-center justify-between mb-8 px-[7%]">
                  {processSteps.map((step, i) => (
                    <div key={i} className="flex items-center">
                      <div
                        className={`relative w-10 h-10 flex items-center justify-center transition-all duration-500 ${
                          i <= activeStep
                            ? "bg-[#b91c1c] text-white"
                            : "bg-white/[0.05] border border-white/20 text-white/40"
                        }`}
                      >
                        <span className="text-sm font-bold font-display">{String(i + 1).padStart(2, "0")}</span>
                        {activeStep === i && <div className="pulse-ring absolute inset-0 border-2 border-[#b91c1c]" />}
                      </div>
                      {i < processSteps.length - 1 && (
                        <div className="w-[calc(25vw-120px)] max-w-[180px] min-w-[60px] h-[2px] bg-white/10 mx-2">
                          <div
                            className={`h-full bg-[#b91c1c] transition-all duration-700 ease-out ${
                              i < activeStep ? "w-full" : "w-0"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {processSteps.map((step, i) => (
                    <div
                      key={i}
                      className={`process-step p-6 border transition-all duration-500 ${
                        activeStep === i
                          ? "bg-white/[0.06] border-[#b91c1c]/30"
                          : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 flex items-center justify-center mb-5 transition-all duration-500 ${
                          activeStep === i
                            ? "bg-[#b91c1c]/20 text-[#b91c1c]"
                            : "bg-white/[0.05] border border-white/[0.1] text-white/60"
                        }`}
                      >
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-medium text-[#b91c1c] uppercase tracking-wider mb-2 font-display">
                        {step.subtitle}
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-3 font-display">{step.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile/Tablet Process Flow */}
              <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                {processSteps.map((step, i) => (
                  <div key={i} className="process-step relative">
                    <div
                      className={`p-6 border transition-all duration-500 ${
                        activeStep === i ? "bg-white/[0.06] border-[#b91c1c]/30" : "bg-white/[0.02] border-white/[0.06]"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 flex-shrink-0 flex items-center justify-center transition-all duration-500 ${
                            activeStep === i
                              ? "bg-[#b91c1c] text-white"
                              : "bg-white/[0.05] border border-white/[0.1] text-white/60"
                          }`}
                        >
                          <step.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-white/40 font-display">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-xs font-medium text-[#b91c1c] uppercase tracking-wider font-display">
                              {step.subtitle}
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-2 font-display">{step.title}</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Outcomes */}
          <div className="storage-fade grid lg:grid-cols-2 gap-12 items-start">
            <div className="p-8 lg:p-10 bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-xl font-semibold text-white mb-8 font-display">Assessment Outcomes</h3>
              <div className="space-y-4">
                {outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#b91c1c]/10 border border-[#b91c1c]/20 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-4 h-4 text-[#b91c1c]" />
                    </div>
                    <p className="text-slate-300 leading-relaxed">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 lg:p-10 bg-gradient-to-br from-[#b91c1c]/10 to-transparent border border-[#b91c1c]/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#b91c1c] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-[#b91c1c] uppercase tracking-wider font-display">
                  Non-Invasive Approach
                </span>
              </div>
              <p className="text-lg text-white leading-relaxed mb-6">
                Our technology samples ambient air around stored ordnance to detect trace chemical  linked to
                early degradation—
                <span className="text-white font-medium">
                  without any physical contact, disassembly, or disruption to storage operations.
                </span>
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                This positions our capability as a safety assessment service aligned with national defence requirements,
                designed for ammunition depots, storage facilities, and operational environments where ordnance
                integrity must be verified without risk.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
