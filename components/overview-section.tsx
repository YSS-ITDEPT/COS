"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { Shield, Target, Crosshair, AlertTriangle } from "lucide-react"

export function OverviewSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(".overview-parallax", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.fromTo(
        ".header-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      )

      gsap.fromTo(
        ".overview-title",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      )

      gsap.fromTo(
        ".overview-desc",
        { opacity: 0, filter: "blur(8px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      )

      gsap.fromTo(
        ".key-diff",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".key-diff", start: "top 80%" },
        },
      )

      gsap.fromTo(
        ".point-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".point-card", start: "top 85%" },
        },
      )

      gsap.fromTo(
        ".engineers-image",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".engineers-image", start: "top 80%" },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  const keyPoints = [
    {
      icon: Shield,
      title: "Defence Engineering",
      desc: "Specialised expertise in ordnance safety and stability assessment",
    },
    {
      icon: Target,
      title: "Chemical Analytics",
      desc: "Patented Chemical Trace Detection System",
    },
    {
      icon: Crosshair,
      title: "Non-Invasive Diagnostics",
      desc: "Environmental sampling without physical contact with ordnance",
    },
    {
      icon: AlertTriangle,
      title: "Accident Prevention",
      desc: "Early detection of instability indicators before failure occurs",
    },
  ]

  return (
    <section ref={sectionRef} id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="overview-parallax absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0a1628 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="header-line h-px w-12 bg-[#b91c1c] origin-left" />
              <span className="text-sm font-medium text-[#b91c1c] uppercase tracking-wider font-display">
                About the Company
              </span>
            </div>
            <h2 className="overview-title text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0a1628] mb-6 max-w-4xl font-display">
              A Specialised Ordnance Safety Intelligence Company
            </h2>
            <p className="overview-desc text-lg text-slate-600 leading-relaxed max-w-4xl font-display">
              Canada Ordnance Safety Inc. is a high-technology defence and national security company focused exclusively
              on ordnance safety, stability assessment, and accident prevention. We operate at the intersection of
              defence engineering, chemical sensing, and non-invasive diagnostic technologies.
            </p>
          </div>

          {/* Field Operations */}
      <div className="field-ops-image relative overflow-hidden group cursor-default mb-16">
  {/* Desktop Image */}
  <Image
    src="https://ik.imagekit.io/d9wt8plt0/Firefly%2020251227182659.png"
    alt="Canada Ordnance Safety field operations - soldier conducting chemical agent monitoring on ammunition transport"
    width={1920}
    height={600}
    className="hidden sm:block w-full h-[450px] lg:h-[500px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
  />
  {/* Mobile Image */}
  <Image
    src="https://ik.imagekit.io/d9wt8plt0/mob.png"
    alt="Canada Ordnance Safety field operations - soldier conducting chemical agent monitoring on ammunition transport"
    width={1920}
    height={600}
    className="sm:hidden w-full h-[650px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-transparent to-transparent" />
  <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8">
    <span className="inline-block px-3 py-1 bg-[#b91c1c] text-white text-xs font-medium uppercase tracking-wider mb-3 font-display">
      Field Operations
    </span>
    <h4 className="text-xl lg:text-2xl font-semibold text-white font-display">
      Expert Engineers Conducting Safety Assessments
    </h4>
    <p className="text-white/80 text-sm mt-2 max-w-2xl">
      The AACTS system enables authorised military and ordnance personnel to perform rapid, non-invasive condition assessments during field operations, supporting informed go / no-go safety decisions.
    </p>
  </div>
  
  {/* Disclaimer */}
  <div className="absolute bottom-0 left-0 right-0 py-2 px-3 bg-gradient-to-t from-black/70 to-transparent">
    <span className="text-[10px] text-white/20 italic">
      *For representation purposes only
    </span>
  </div>
</div>

      {/* Key differentiator */}
<div className="key-diff bg-[#0a1628] p-8 lg:p-12 mb-16">
  <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed font-display">
    Safety is not a single inspection — it’s continuous awareness.
    <span className="block mt-3 text-white/80">
      COS enables <span className="text-white">non-invasive stabilizer and degradation monitoring</span> to support safer
      storage, high-risk handling phases, and transport readiness verification.
    </span>
    <span className="block mt-3 text-[#b91c1c]">
      Environmental sampling. Field-deployable. Decision-support focused.
    </span>
  </p>
</div>

          {/* Key Points Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyPoints.map((point, i) => (
              <div
                key={i}
                className="point-card p-6 border border-slate-200 bg-slate-50/50 transition-all duration-300 hover:border-[#b91c1c]/30 hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-[#0a1628] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <point.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#0a1628] mb-2 font-display">{point.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-display">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
