"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { Mail, MapPin, ArrowUp, Shield, Zap } from "lucide-react"

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !footerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: footerRef.current, start: "top 95%" } },
      )
    }, footerRef)

    return () => ctx.revert()
  }, [isReady])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-[#0a1628] via-[#b91c1c] to-[#0a1628]" />

      <div className="bg-[#060d18] text-white relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
          {/* Maple Leaf Background Elements */}
          <div className="absolute top-10 right-0 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] opacity-[0.1]">
            <Image
              src="https://ik.imagekit.io/d9wt8plt0/Gemini_Generated_Image_ki87luki87luki87-removebg-preview.png"
              alt=""
              width={600}
              height={600}
              className="w-full h-full object-contain"
            />
          </div>
       
        </div>

        <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10">
          <div ref={contentRef} className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-2">
                <img
                  src="https://ik.imagekit.io/d9wt8plt0/cos-removebg-preview.png"
                  alt="Canada Ordnance Safety"
                  className="h-46 w-auto mb-6 brightness-0 invert"
                />
                <p className="text-white/80 leading-relaxed max-w-md mb-8 font-display text-lg">
                  Advanced Trace Chemical Detection sensing for ordnance safety. Supporting safe lifecycle management of
                  energetic materials across Canada.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10">
                    <Zap className="w-4 h-4 text-[#b91c1c]" />
                    <span className="text-[10px] uppercase tracking-wider text-white/50 font-display">
                      Powered by AACTS
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick links */}
                 <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-6 font-display">
                  Navigation
                </h4>
           <nav className="flex flex-col gap-3">
  {["About", "Challenge", "Storage-Safety", "Transportation", "Periodic-Monitoring", "System"].map((item) => (
    <button
      key={item}
      onClick={() => {
        const target = document.querySelector(`#${item.toLowerCase()}`)
        if (target) {
          const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          })
        }
      }}
      className="text-white/40 hover:text-white transition-colors text-sm underline-reveal inline-block font-display cursor-pointer text-left"
    >
      {item}
    </button>
  ))}
</nav>
              </div>

              {/* Contact info */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-6 font-display">Contact</h4>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-white/60 text-sm font-display">
                    <div className="w-8 h-8 bg-white/5 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[#b91c1c]" />
                    </div>
                    <span>sales@canadaordnancesafety.com</span>
                  </div>
               
                </div>
              </div>
            </div>

         <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-white/30 text-sm font-display text-center md:text-left">
                © {new Date().getFullYear()} Canada Ordnance Safety Inc. All rights reserved.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#b91c1c]/50 to-transparent" />
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/20 font-medium font-display">
                    Canadian Defence Excellence
                  </span>
                  <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#b91c1c]/50 to-transparent" />
                </div>

                <button
                  onClick={scrollToTop}
                  className="w-10 h-10 bg-white/5 hover:bg-[#b91c1c] border border-white/10 hover:border-[#b91c1c] flex items-center justify-center transition-all duration-500 group"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}