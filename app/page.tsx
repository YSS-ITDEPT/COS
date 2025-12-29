import { GSAPProvider } from "@/components/gsap-provider"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OverviewSection } from "@/components/overview-section"
import { WhyStabilizersSection } from "@/components/why-stabilizers-section"
import { StorageSection } from "@/components/storage-section"
import { TransportationSection } from "@/components/transportation-section"
import { PeriodicMonitoringSection } from "@/components/periodic-monitoring-section"
import { SystemSection } from "@/components/system-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <GSAPProvider>
      <div className="min-h-screen bg-[#f8fafc]">
        <Header />
        <main>
          <HeroSection />
          <OverviewSection />
          <WhyStabilizersSection />
          <StorageSection />
          <TransportationSection />
          <PeriodicMonitoringSection />
          <SystemSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </GSAPProvider>
  )
}
