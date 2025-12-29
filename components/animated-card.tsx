"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"

interface AnimatedCardProps {
  children: ReactNode
  index?: number
  className?: string
}

export function AnimatedCard({ children, index = 0, className = "" }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()

  useEffect(() => {
    if (!isReady || !cardRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      )
    }, cardRef)

    return () => ctx.revert()
  }, [isReady, index])

  return (
    <div ref={cardRef} className={className}>
      {children}
    </div>
  )
}
