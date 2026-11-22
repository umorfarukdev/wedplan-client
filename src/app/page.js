import HeroSection from "@/components/home/HeroSection";
import FeaturedServices from "@/components/home/FeaturedServices";
import ServiceCategories from "@/components/home/ServiceCategories";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import TestimonialsCTA from "@/components/home/TestimonialsCTA";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <FeaturedServices />
      <ServiceCategories />
      <HowItWorks />
      <Testimonials />
      <TestimonialsCTA />
    </main>
  );
}