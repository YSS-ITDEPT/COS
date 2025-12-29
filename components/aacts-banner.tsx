"use client"

import Image from "next/image"

export function AACTSBanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[200px] lg:h-[280px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[600px] lg:w-[800px] h-full">
            <Image
              src="/images/aacts-branding.png"
              alt="AACTS - Advanced Air Composition & Traceability System"
              fill
              className="object-contain object-center"
            />
          </div>
        </div>
        {/* Dark overlay to blend with site theme */}
        <div className="absolute inset-0 bg-[#0a1628]/85" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-16 bg-[#c8102e]" />
                <span className="text-[#c8102e] text-xs font-bold uppercase tracking-[0.3em]">Powered By</span>
                <div className="h-px w-16 bg-[#c8102e]" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-3">
                AACTS<sup className="text-lg">®</sup>
              </h2>
              <p className="text-white/60 text-sm lg:text-base uppercase tracking-widest">
                Advanced Air Composition & Traceability System
              </p>
              <p className="text-[#c8102e] text-xs lg:text-sm uppercase tracking-wider mt-2 font-medium">
                Real-Time Vapor Detection Technology 
              </p>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c8102e] to-transparent" />
      </div>
    </section>
  )
}
