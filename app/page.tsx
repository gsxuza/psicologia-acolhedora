import { LandingHeader } from "@/components/landing/LandingHeader";
import { Hero } from "@/components/landing/Hero";
import { AboutSection } from "@/components/landing/AboutSection";
import { SpecialtiesSection } from "@/components/landing/SpecialtiesSection";
import { ThermometerTeaserSection } from "@/components/landing/ThermometerTeaserSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-sand-100">
      <LandingHeader />
      <Hero />
      <AboutSection />
      <SpecialtiesSection />
      <ThermometerTeaserSection />
      <TestimonialsSection />
      <FaqSection />
      <LandingFooter />
    </div>
  );
}
