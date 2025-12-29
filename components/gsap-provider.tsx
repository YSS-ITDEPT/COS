"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface GSAPContextType {
  isReady: boolean
}

const GSAPContext = createContext<GSAPContextType>({ isReady: false })

export function useGSAP() {
  return useContext(GSAPContext)
}

export function GSAPProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Configure GSAP defaults
    gsap.config({
      nullTargetWarn: false,
    })

    gsap.defaults({
      ease: "power3.out",
      duration: 1,
    })

    setIsReady(true)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return <GSAPContext.Provider value={{ isReady }}>{children}</GSAPContext.Provider>
}
