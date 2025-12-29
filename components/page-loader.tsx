"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Smooth progress animation
    let currentProgress = 0
    const targetProgress = 90
    
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 15
      if (currentProgress >= targetProgress) {
        currentProgress = targetProgress
        clearInterval(progressInterval)
      }
      setProgress(Math.floor(currentProgress))
    }, 200)

    const handleLoad = () => {
      // Complete the progress
      const completeInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(completeInterval)
            return 100
          }
          return prev + 2
        })
      }, 30)

      // Start fade out after reaching 100%
      setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => {
          setIsLoading(false)
        }, 800)
      }, 500)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => {
      clearInterval(progressInterval)
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-[#0a1628] via-[#0f1d2f] to-[#0a1628] flex items-center justify-center transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated Background with Skeleton Reveal Effect */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        
        {/* Skeleton Reveal Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Horizontal skeleton bars revealing from top */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-8 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"
              style={{
                top: `${i * 5}%`,
                animationDelay: `${i * 0.1}s`,
                animation: 'skeletonReveal 3s ease-out infinite',
              }}
            />
          ))}
          
          {/* Vertical skeleton bars revealing from left */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-12 bg-gradient-to-b from-transparent via-[#b91c1c]/[0.03] to-transparent"
              style={{
                left: `${i * 6.67}%`,
                animationDelay: `${i * 0.15}s`,
                animation: 'skeletonRevealVertical 3.5s ease-out infinite',
              }}
            />
          ))}
        </div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b91c1c]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "6s", animationDelay: "2s" }} />
        
        {/* Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#b91c1c] to-transparent animate-scan" />
        
        {/* Radial Reveal Effect */}
        <div 
          className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0a1628]/50"
          style={{
            maskImage: `radial-gradient(circle at center, transparent ${progress}%, black ${progress + 10}%)`,
            WebkitMaskImage: `radial-gradient(circle at center, transparent ${progress}%, black ${progress + 10}%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container with Pulse Effect */}
        <div className="mb-8 relative">
          {/* Outer Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border border-[#b91c1c]/20 rounded-full animate-ping" style={{ animationDuration: "3s" }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-56 h-56 border border-white/10 rounded-full animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
          </div>
          
         
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-[#b91c1c]/20 blur-3xl animate-pulse" />
          
          {/* Logo */}
          <div className="relative z-10 w-48 h-48 flex items-center justify-center">
            <div className="relative">
              <Image
                src="https://ik.imagekit.io/d9wt8plt0/cos-removebg-preview.png?updatedAt=1766764594577"
                alt="Canada Ordnance Safety"
                width={180}
                height={180}
                className="brightness-0 invert animate-float"
                priority
              />
              {/* Logo Reveal Overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-[#0a1628] to-transparent transition-all duration-500"
                style={{ 
                  clipPath: `inset(${100 - progress}% 0 0 0)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Company Name with Reveal Effect */}
        <div className="text-center mb-8 overflow-hidden">
          <h1 
            className="text-2xl font-bold text-white font-display tracking-wide mb-2 transition-all duration-700"
            style={{
              clipPath: `inset(0 ${100 - progress}% 0 0)`,
            }}
          >
            CANADA ORDNANCE SAFETY
          </h1>
          <div 
            className="h-px w-32 bg-gradient-to-r from-transparent via-[#b91c1c] to-transparent mx-auto mb-2 transition-all duration-500"
            style={{ width: `${progress * 1.28}px` }}
          />
          <p 
            className="text-xs text-white/50 uppercase tracking-[0.3em] font-display transition-all duration-700"
            style={{
              clipPath: `inset(0 ${100 - progress}% 0 0)`,
            }}
          >
            Defence Technology • Ordnance Safety
          </p>
        </div>

        {/* Advanced Progress Bar */}
        <div className="w-80 space-y-2">
          {/* Progress Track */}
          <div className="relative h-1 bg-white/10 overflow-hidden">
            {/* Progress Fill */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#b91c1c] via-[#ff3e5e] to-[#b91c1c] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
            {/* Shimmer Effect */}
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            {/* Glow */}
            <div
              className="absolute top-0 left-0 h-full bg-[#b91c1c] blur-sm transition-all duration-300 ease-out"
              style={{ width: `${progress}%`, opacity: 0.5 }}
            />
          </div>
          
          {/* Progress Info */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-[#b91c1c] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 bg-[#b91c1c] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 bg-[#b91c1c] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-white/60 font-display">
                {progress < 30 && "Initializing System"}
                {progress >= 30 && progress < 60 && "Loading Assets"}
                {progress >= 60 && progress < 90 && "Preparing Interface"}
                {progress >= 90 && progress < 100 && "Almost Ready"}
                {progress === 100 && "Complete"}
              </span>
            </div>
            <span className="text-white/80 font-mono font-bold tabular-nums">{progress}%</span>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-display">
            {progress < 100 ? "Establishing Secure Connection" : "Connection Secure"}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scan {
          0%, 100% { transform: translateY(0); opacity: 0; }
          50% { transform: translateY(100vh); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes skeletonReveal {
          0% { 
            transform: scaleX(0);
            opacity: 0;
          }
          50% { 
            transform: scaleX(1);
            opacity: 1;
          }
          100% { 
            transform: scaleX(0);
            opacity: 0;
          }
        }
        @keyframes skeletonRevealVertical {
          0% { 
            transform: scaleY(0);
            opacity: 0;
          }
          50% { 
            transform: scaleY(1);
            opacity: 1;
          }
          100% { 
            transform: scaleY(0);
            opacity: 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-scan {
          animation: scan 4s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}