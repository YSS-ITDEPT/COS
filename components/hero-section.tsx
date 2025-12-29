"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { Zap, CheckCircle, ChevronRight, ArrowDown } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

const createRipple = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
  const button = e.currentTarget
  const rect = button.getBoundingClientRect()
  const ripple = document.createElement("span")
  const size = Math.max(rect.width, rect.height)

  ripple.style.width = ripple.style.height = `${size}px`
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`
  ripple.className = "ripple"

  button.appendChild(ripple)
  setTimeout(() => ripple.remove(), 600)
}

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Badge clip-path reveal
      tl.fromTo(
        ".hero-badge",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.8 },
      )

      // Title word-by-word reveal with stagger
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word")
        tl.fromTo(
          words,
          { opacity: 0, y: 60, rotateX: -45 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.4",
        )
      }

      // Subtitle typewriter effect
      tl.fromTo(
        ".hero-subtitle",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power2.inOut" },
        "-=0.3",
      )

      // Description fade with blur
      tl.fromTo(
        ".hero-desc",
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
        "-=0.5",
      )

      // CTAs with scale bounce
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
        "-=0.4",
      )

      // Trust items slide in from left
      tl.fromTo(".hero-trust", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")

      // Image entrance
      tl.fromTo(
        ".hero-image",
        { opacity: 0, x: 60, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.8",
      )

      // Metrics card entrance
      tl.fromTo(".metrics-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])

  const capabilities = [
    { num: "01", title: "Storage Assessment", desc: "Air sampling in magazines and depots" },
    { num: "02", title: "Handling Verification", desc: "Pre-movement safety screening" },
    { num: "03", title: "Transport Checks", desc: "Condition continuity verification" },
    { num: "04", title: "Disposal Planning", desc: "Risk-based prioritization support" },
  ]

  // Split title into words for animation
  const titleText = "Real-Time Chemical Monitoring for Ordnance Safety"
  const titleWords = titleText.split(" ")

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f1d2f] to-[#0a1628]">
        {/* Checkered grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Maple Leaf Background Elements */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute top-20 left-1/2 -translate-x-1/2 sm:left-20 sm:translate-x-0 w-[450px] h-[450px] lg:w-[650px] lg:h-[650px] opacity-[0.2] -scale-x-100 flex items-center justify-center">
    <Image
      src="https://ik.imagekit.io/d9wt8plt0/Gemini_Generated_Image_ki87luki87luki87-removebg-preview.png"
      alt=""
      width={650}
      height={650}
      className="w-full h-full object-contain"
    />
  </div>
</div>

        <div
          ref={spotlightRef}
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePos.x - 200,
            top: mousePos.y - 200,
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(185,28,28,0.15) 0%, transparent 70%)",
            opacity: mousePos.x > 0 ? 1 : 0,
          }}
        />

        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#b91c1c]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#060d18] to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8" style={{ perspective: "1000px" }}>
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded select-none">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-white/70 uppercase tracking-wider font-display">
                Defence Technology • Ordnance Safety
              </span>
            </div>

            <div>
              <h1
                ref={titleRef}
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-4 font-display"
                style={{ perspective: "1000px" }}
              >
                {titleWords.map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.25em]" style={{ transformStyle: "preserve-3d" }}>
                    {word}
                  </span>
                ))}
              </h1>
              <p className="hero-subtitle text-xl md:text-2xl text-[#b91c1c] font-medium font-display overflow-hidden">
                Non-Invasive. Vapour-Phase. Field-Deployable.
              </p>
            </div>

            {/* Description */}
            <p className="hero-desc text-lg text-white/70 leading-relaxed max-w-xl font-display">
              Advanced vapour-phase chemical sensing using AACTS/IMS technology for assessing ordnance stability and
              preventing accidents—without physical contact with stored munitions.
            </p>

            {/* CTAs */}
           <div className="flex flex-col sm:flex-row gap-4">
             <button
  onClick={(e) => {
    createRipple(e)
    const target = document.querySelector('#contact')
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      })
    }
  }}
  className="hero-cta group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#b91c1c] text-white font-medium transition-all duration-300 hover:bg-[#991b1b] hover:scale-105 hover:shadow-lg hover:shadow-[#b91c1c]/25 active:scale-95 font-display relative overflow-hidden cursor-pointer"
>
  Request Consultation
  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
</button>

<button
  onClick={(e) => {
    createRipple(e)
    const target = document.querySelector('#about')
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      })
    }
  }}
  className="hero-cta group inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-medium border border-white/30 transition-all duration-300 hover:bg-white/5 hover:border-white/50 hover:scale-105 active:scale-95 font-display relative overflow-hidden cursor-pointer"
>
  How It Works
  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
</button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
              <span className="hero-trust flex items-center gap-2 text-sm text-white/50 font-display transition-colors hover:text-white/70 cursor-default select-none">
                <Zap className="w-4 h-4 text-[#b91c1c]" />
                Powered by AACTS
              </span>
              <span className="hero-trust flex items-center gap-2 text-sm text-white/50 font-display transition-colors hover:text-white/70 cursor-default select-none">
                <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                Field-Proven System
              </span>
            </div>
          </div>

          {/* Right - Single Image with Glassmorphism Card */}
          <div className="hero-image relative lg:pl-4">
            {/* Image Container */}
            <div className="relative aspect-[4/3] rounded overflow-hidden">
              <Image
                src="https://ik.imagekit.io/d9wt8plt0/hero_section.jpeg"
                alt="AACTS chemical monitoring system for ordnance safety"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-[#0a1628]/20 to-transparent" />
              
              {/* Disclaimer */}
              <div className="absolute bottom-0 left-0 right-0 py-2 px-3 bg-gradient-to-t from-black/70 to-transparent">
                <span className="text-[10px] text-white/20 italic">
                  *For representation purposes only
                </span>
              </div>
            </div>

            {/* Operational Coverage List */}
            <div className="mt-4 p-4 bg-white/[0.03] border border-white/10 rounded">
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">
                Operational Coverage
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {capabilities.map((cap) => (
                  <div key={cap.num} className="flex gap-3 items-start">
                    <span className="text-[#b91c1c] text-xs font-bold font-mono">{cap.num}</span>
                    <div>
                      <span className="text-sm text-white font-medium block">{cap.title}</span>
                      <span className="text-xs text-white/50">{cap.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}