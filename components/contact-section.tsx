"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "./gsap-provider"
import { SectionHeader } from "./section-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Mail, Send, Clock, CheckCircle,Phone  } from "lucide-react"
import { useId } from "react";


export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const { isReady } = useGSAP()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    message: "",
  })

  const [tsToken, setTsToken] = useState<string>("");
  const widgetIdRef = useRef<string | null>(null);
  const turnstileElId = useId().replace(/:/g, "");
const [turnstileKey, setTurnstileKey] = useState(0);

  useEffect(() => {
    if (!isReady || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      )

      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isReady])
useEffect(() => {
  const w = window as any;
  let cancelled = false;

  const render = () => {
    if (cancelled) return;
    if (!w.turnstile) return;

    // IMPORTANT: if we re-mounted the container, render again
    if (widgetIdRef.current) return;

    widgetIdRef.current = w.turnstile.render(`#ts-${turnstileElId}`, {
      sitekey: "0x4AAAAAACJnzGOWCZ_NF-dH",
      theme: "light",
      callback: (token: string) => setTsToken(token),
      "expired-callback": () => setTsToken(""),
      "error-callback": () => setTsToken(""),
    });
  };

  render();
  const t = setInterval(render, 300);

  return () => {
    cancelled = true;
    clearInterval(t);

    // IMPORTANT: remove widget on unmount so it can be rendered again
    try {
      if (w.turnstile && widgetIdRef.current) w.turnstile.remove(widgetIdRef.current);
    } catch {}

    widgetIdRef.current = null;
  };
}, [turnstileElId, turnstileKey]); // IMPORTANT: include turnstileKey


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!tsToken) {
    alert("Please complete the verification and try again.");
    return;
  }

  setIsSubmitting(true);

  try {
    const res = await fetch("/cos/api/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, turnstile_token: tsToken }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      throw new Error(data?.error || "Submission failed");
    }

    setIsSubmitted(true);
widgetIdRef.current = null;
    // reset Turnstile token + widget
    setTsToken("");
    try {
      const w = window as any;
      if (w.turnstile && widgetIdRef.current) w.turnstile.reset(widgetIdRef.current);
    } catch {}

  setTimeout(() => {
  setIsSubmitted(false);
  setFormData({ name: "", organization: "", email: "", message: "" });

  // IMPORTANT: force Turnstile container remount + re-render
  setTurnstileKey((k) => k + 1);
  setTsToken("");
}, 6000);

  } catch (err: any) {
    alert(err?.message || "Unable to submit. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section ref={sectionRef} id="contact" className="py-10 lg:py-10 bg-white relative">
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0B1F3B 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0B1F3B]/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <SectionHeader title="Contact" subtitle="Get in touch with our team" centered />
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Information */}
            <div ref={infoRef} className="space-y-6">
              <div className="bg-gradient-to-br from-[#0B1F3B] to-[#08162D] p-10 text-white relative overflow-hidden card-hover">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#b91c1c]/10 select-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 select-none" />

                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <h3 className="text-xl font-bold font-display">Canada Ordnance Safety</h3>
                </div>

                <div className="space-y-6 relative z-10">
             
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                      <Phone className="h-5 w-5 text-[#b91c1c]" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs uppercase tracking-widest mb-1 font-display select-none">
                        Phone
                      </div>
                      <a
                        href="tel:+14166276767"
                        className="text-white font-medium hover:text-[#b91c1c] transition-colors font-display cursor-pointer link-underline text-sm"
                      >
                        +1 (437) 250-1010
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                      <Mail className="h-5 w-5 text-[#b91c1c]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white/50 text-xs uppercase tracking-widest mb-1 font-display select-none">
                        Email
                      </div>
                      <a
                        href="mailto:sales@canadaordnancesafety.com"
                        className="text-white font-medium hover:text-[#b91c1c] transition-colors font-display cursor-pointer link-underline text-sm break-all"
                      >
                        sales@canadaordnancesafety.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group cursor-default">
                    <div className="w-10 h-10 bg-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                      <Clock className="h-5 w-5 text-[#b91c1c]" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs uppercase tracking-widest mb-1 font-display select-none">
                        Business Hours
                      </div>
                      <div className="text-white font-medium font-display">Monday - Friday</div>
                      <div className="text-white/70 text-sm font-display">9:00 AM - 6:00 PM EST</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#b91c1c]" />
              </div>

              <div className="bg-[#F4F6F9] p-5 border border-[#0B1F3B]/5">
                <p className="text-sm text-[#0B1F3B]/50 italic text-center font-display">
                  This website describes operational capabilities and safety support practices.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div ref={formRef} className="bg-[#F4F6F9] border border-[#0B1F3B]/5 p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b91c1c] via-[#0B1F3B] to-[#b91c1c]" />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-[#b91c1c] rotate-45 select-none" />
                <h3 className="text-sm font-bold text-[#0B1F3B] uppercase tracking-widest font-display select-none">
                  General Enquiry
                </h3>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#0B1F3B] mb-2 font-display">Message Sent!</h4>
                  <p className="text-[#0B1F3B]/60 font-display">We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-[#0B1F3B]/60 uppercase text-xs tracking-wider font-semibold font-display select-none"
                      >
                        Name <span className="text-[#b91c1c]">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="border-2 border-[#0B1F3B]/10 focus:border-[#b91c1c] rounded-none h-12 bg-white px-4 font-display transition-all duration-300 cursor-text"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="organization"
                        className="text-[#0B1F3B]/60 uppercase text-xs tracking-wider font-semibold font-display select-none"
                      >
                        Organization
                      </Label>
                      <Input
                        id="organization"
                        name="organization"
                        type="text"
                        value={formData.organization}
                        onChange={handleChange}
                        className="border-2 border-[#0B1F3B]/10 focus:border-[#b91c1c] rounded-none h-12 bg-white px-4 font-display transition-all duration-300 cursor-text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-[#0B1F3B]/60 uppercase text-xs tracking-wider font-semibold font-display select-none"
                    >
                      Email <span className="text-[#b91c1c]">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="border-2 border-[#0B1F3B]/10 focus:border-[#b91c1c] rounded-none h-12 bg-white px-4 font-display transition-all duration-300 cursor-text"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-[#0B1F3B]/60 uppercase text-xs tracking-wider font-semibold font-display select-none"
                    >
                      Message <span className="text-[#b91c1c]">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="border-2 border-[#0B1F3B]/10 focus:border-[#b91c1c] rounded-none min-h-28 bg-white px-4 py-3 resize-none font-display transition-all duration-300 cursor-text"
                    />
                  </div>
<div className="pt-2">
 <div key={turnstileKey} id={`ts-${turnstileElId}`} />

  <p className="text-xs text-[#0B1F3B]/50 mt-2 font-display">
    This form is protected by Turnstile.
  </p>
</div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0B1F3B] hover:bg-[#b91c1c] text-white rounded-none h-12 text-sm font-semibold uppercase tracking-wider transition-all duration-300 font-display hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
