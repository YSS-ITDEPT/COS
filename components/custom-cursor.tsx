"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    // Hide on touch devices
    if ("ontouchstart" in window) {
      cursor.style.display = "none"
      cursorDot.style.display = "none"
      return
    }

    const onMouseMove = (e: MouseEvent) => {
      // Outer crosshair follows with slight delay
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      })
      // Inner dot follows instantly
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "none",
      })
    }

    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    // Detect hoverable elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true)
      }
    }

    const onMouseOut = () => setIsHovering(false)

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mouseout", onMouseOut)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseout", onMouseOut)
    }
  }, [])

  return (
    <>
      {/* Outer crosshair */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ left: 0, top: 0 }}
      >
        {/* Crosshair arms */}
        <div
          className={`relative transition-all duration-200 ${
            isHovering ? "scale-150" : "scale-100"
          } ${isClicking ? "scale-75" : ""}`}
        >
          {/* Top arm */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-red-600 transition-all duration-200 ${
              isHovering ? "h-4 -top-6" : "h-3 -top-4"
            }`}
          />
          {/* Bottom arm */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-red-600 transition-all duration-200 ${
              isHovering ? "h-4 top-2" : "h-3 top-1"
            }`}
          />
          {/* Left arm */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-red-600 transition-all duration-200 ${
              isHovering ? "w-4 -left-6" : "w-3 -left-4"
            }`}
          />
          {/* Right arm */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-red-600 transition-all duration-200 ${
              isHovering ? "w-4 left-2" : "w-3 left-1"
            }`}
          />
          {/* Corner brackets when hovering */}
          {isHovering && (
            <>
              <div className="absolute -top-5 -left-5 w-2 h-2 border-t-2 border-l-2 border-red-600" />
              <div className="absolute -top-5 -right-5 w-2 h-2 border-t-2 border-r-2 border-red-600" />
              <div className="absolute -bottom-5 -left-5 w-2 h-2 border-b-2 border-l-2 border-red-600" />
              <div className="absolute -bottom-5 -right-5 w-2 h-2 border-b-2 border-r-2 border-red-600" />
            </>
          )}
        </div>
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className={`fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 transition-all duration-100 ${
          isHovering ? "w-2 h-2 opacity-100" : "w-1 h-1 opacity-80"
        } ${isClicking ? "scale-150" : ""}`}
        style={{ left: 0, top: 0 }}
      />
    </>
  )
}
