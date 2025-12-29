"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight } from "lucide-react"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"

const navItems = [
  { label: "About", href: "#about" },
  { label: "The Challenge", href: "#challenge" },
  { label: "Safety Assessment", href: "#storage-safety" },
  { label: "Transportation", href: "#transportation" },
  { label: "Monitoring", href: "#periodic-monitoring" },
  { label: "Technology", href: "#system" },
]

// Sections that should have dark header
const darkHeaderSections = ["about", "challenge", "transportation", "system"]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isDarkHeader, setIsDarkHeader] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20)

    if (progressRef.current) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / scrollHeight) * 100
      progressRef.current.style.width = `${progress}%`
    }

    // Check if we're at the very top (hero section)
    if (window.scrollY < 100) {
      setActiveSection("")
      setIsDarkHeader(false)
      return
    }

    const sections = navItems.map((item) => item.href.replace("#", ""))
    for (const sectionId of sections.reverse()) {
      const section = document.getElementById(sectionId)
      if (section) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150) {
          setActiveSection(sectionId)
          // Check if this section should have dark header
          setIsDarkHeader(darkHeaderSections.includes(sectionId))
          break
        }
      }
    }
  }

  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [])

  useEffect(() => {
    if (!isReady || !navRef.current) return

    gsap.fromTo(
      navRef.current.querySelectorAll("a"),
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", delay: 0.2 },
    )
  }, [isReady])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    
    const target = document.querySelector(href)
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      })
    }
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isDarkHeader 
          ? "bg-[#0f172a]/98 backdrop-blur-sm shadow-sm" 
          : isScrolled 
            ? "bg-white/98 backdrop-blur-sm shadow-sm" 
            : "bg-white"
      }`}
    >
      {/* Top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-[#0a1628] via-[#b91c1c] to-[#0a1628]" />

      <div className="h-0.5 bg-transparent relative">
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-full bg-[#b91c1c] transition-all duration-100"
          style={{ width: "0%" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="https://canadaordnancesafety.com" className="flex items-center gap-3 group cursor-pointer">
            <img
              src="https://ik.imagekit.io/d9wt8plt0/cos-removebg-preview.png"
              alt="Canada Ordnance Safety"
              className={`h-40 w-auto transition-all duration-500 group-hover:scale-105 ${
                isDarkHeader ? "brightness-0 invert" : ""
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-2 text-sm font-medium font-display transition-all duration-500 relative cursor-pointer link-underline ${
                  activeSection === item.href.replace("#", "")
                    ? isDarkHeader ? "text-[#b91c1c]" : "text-[#b91c1c]"
                    : isDarkHeader 
                      ? "text-white/70 hover:text-white" 
                      : "text-slate-600 hover:text-[#0a1628]"
                }`}
              >
                {item.label}
                {activeSection === item.href.replace("#", "") && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#b91c1c] rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Button
              asChild
              className={`px-6 py-2.5 rounded-none transition-all duration-500 font-medium font-display hover:scale-105 active:scale-95 cursor-pointer ${
                isDarkHeader 
                  ? "bg-white text-[#0a1628] hover:bg-[#b91c1c] hover:text-white" 
                  : "bg-[#0a1628] hover:bg-[#b91c1c] text-white"
              }`}
            >
              <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="flex items-center gap-2">
                Contact
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 cursor-pointer hover:bg-slate-100/10 transition-colors rounded ${
              isDarkHeader ? "text-white" : "text-[#0a1628]"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t py-4 animate-in slide-in-from-top-2 duration-200 ${
            isDarkHeader ? "border-white/10" : "border-slate-100"
          }`}>
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-medium font-display transition-colors py-3 px-4 cursor-pointer ${
                    activeSection === item.href.replace("#", "")
                      ? isDarkHeader 
                        ? "text-[#b91c1c] bg-white/5" 
                        : "text-[#b91c1c] bg-red-50"
                      : isDarkHeader
                        ? "text-white/70 hover:text-white hover:bg-white/5"
                        : "text-slate-600 hover:text-[#0a1628] hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className={`pt-4 mt-2 border-t px-4 ${
                isDarkHeader ? "border-white/10" : "border-slate-100"
              }`}>
                <Button
                  asChild
                  className={`w-full rounded-none font-display cursor-pointer ${
                    isDarkHeader 
                      ? "bg-white text-[#0a1628] hover:bg-[#b91c1c] hover:text-white" 
                      : "bg-[#0a1628] hover:bg-[#b91c1c] text-white"
                  }`}
                >
                  <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                    Contact
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}