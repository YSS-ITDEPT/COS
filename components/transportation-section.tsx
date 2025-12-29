"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "./gsap-provider"
import { SectionHeader } from "./section-header"
import { AnimatedCard } from "./animated-card"
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react"

export function TransportationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isReady } = useGSAP()

  const workflow = [
    {
      step: "01",
      title: "Pre-Transport Check",
      desc: "Condition assessment before movement",
    },
    {
      step: "02",
      title: "Controlled Transport",
      desc: "Transportation under defined safety limits",
    },
    {
      step: "03",
      title: "Post-Transport Verification",
      desc: "Assessment before storage or deployment",
    },
  ]

  return (
    <section ref={sectionRef} id="transportation" className="py-18 lg:py-16 bg-white relative overflow-hidden">
    
       <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-8 right-118 w-[380px] h-[380px] lg:w-[580px] lg:h-[580px] opacity-[0.03]">
              <Image
                src="https://ik.imagekit.io/d9wt8plt0/c7bae004-d48f-4415-be24-c11e6743d09d.png"
                alt=""
                width={580}
                height={580}
                className="w-full h-full object-contain"
              />
            </div>
        
          </div>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionHeader
              title="Transportation Safety Support"
              subtitle="Safe logistics through chemical condition awareness"
              centered
            />
            <p className="text-lg text-[#0B1F3B]/70 leading-relaxed max-w-3xl mx-auto mt-6 font-display">
              Transportation introduces mechanical stress and environmental variation that can accelerate degradation in
              energetic materials. Stabilizer-based monitoring supports safer logistics planning.
            </p>
          </div>

         <div className="relative w-full aspect-[21/9] mb-16 overflow-hidden">
  <Image
    src="https://ik.imagekit.io/d9wt8plt0/transport.jpeg"
    alt="Military truck transporting ordnance and ammunition"
    fill
    className="object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3B]/80 via-[#0B1F3B]/20 to-transparent" />
<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-12 hidden sm:block">
    
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2.5 sm:px-6 sm:py-3">
        <span className="text-white/60 text-xs sm:text-sm font-display uppercase tracking-wider block">3-Step</span>
        <p className="text-white font-bold font-display text-sm sm:text-base">Verification Process</p>
      </div>
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2.5 sm:px-6 sm:py-3">
        <span className="text-white/60 text-xs sm:text-sm font-display uppercase tracking-wider block">100%</span>
        <p className="text-white font-bold font-display text-sm sm:text-base">Non-Invasive Method</p>
      </div>
      <div className="bg-[#C8102E]/90 backdrop-blur-sm px-4 py-2.5 sm:px-6 sm:py-3">
        <span className="text-white/80 text-xs sm:text-sm font-display uppercase tracking-wider block">Protocol</span>
        <p className="text-white font-bold font-display text-sm sm:text-base">Pre & Post Transport Checks</p>
      </div>
    </div>
  </div>
  
  {/* Disclaimer */}
  <div className="absolute bottom-0 left-0 right-0 py-2 px-3 bg-gradient-to-t from-black/70 to-transparent">
    <span className="text-[10px] text-white/20 italic">
      *For representation purposes only
    </span>
  </div>
</div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {workflow.map((item, index) => (
              <AnimatedCard key={index} index={index}>
                <div className="group relative h-full bg-[#F4F6F9] hover:bg-[#0B1F3B] transition-all duration-500 overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <span className="text-7xl font-bold text-[#0B1F3B]/[0.06] group-hover:text-white/10 absolute top-4 right-6 transition-colors duration-500 font-display">
                      {item.step}
                    </span>
                    <div className="w-14 h-14 bg-[#0B1F3B] group-hover:bg-[#C8102E] flex items-center justify-center mb-6 transition-colors duration-500">
                      <CheckCircle2 className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-[#0B1F3B] group-hover:text-white mb-2 transition-colors duration-500 font-display">
                      {item.title}
                    </h4>
                    <p className="text-[#0B1F3B]/60 group-hover:text-white/70 transition-colors duration-500 font-display">
                      {item.desc}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C8102E] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </AnimatedCard>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative aspect-[16/9] overflow-hidden">
  <Image
    src="https://ik.imagekit.io/d9wt8plt0/transportpic.jpeg"
    alt="Military container transport vehicle"
    fill
    className="object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3B]/60 to-transparent" />
  <div className="absolute bottom-6 left-6">
    <span className="text-white/60 text-xs font-display uppercase tracking-wider">Secure Container</span>
    <p className="text-white font-bold text-lg font-display">Enclosed Transport System</p>
  </div>
  
  {/* Disclaimer */}
  <div className="absolute bottom-0 left-0 right-0 py-2 px-3 bg-gradient-to-t from-black/70 to-transparent">
    <span className="text-[10px] text-white/20 italic">
      *For representation purposes only
    </span>
  </div>
</div>

            <div className="bg-gradient-to-br from-[#0B1F3B] to-[#08162D] p-10 lg:p-12 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#C8102E]/20 blur-[80px]" />
              <div className="flex items-start gap-5 relative z-10 mb-8">
                <div className="w-14 h-14 bg-[#C8102E]/20 border border-[#C8102E]/30 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-7 w-7 text-[#C8102E]" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3 text-lg font-display">Important Note</h4>
                  <p className="text-white/70 leading-relaxed font-display">
                    Monitoring supports decision-making; it does not replace regulatory transport controls.
                  </p>
                </div>
              </div>
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
  className="inline-flex items-center gap-2 text-[#C8102E] font-semibold hover:gap-4 transition-all duration-300 font-display cursor-pointer"
>
  Request Transport Assessment
  <ArrowRight className="w-5 h-5" />
</button>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8102E] via-[#C8102E]/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
