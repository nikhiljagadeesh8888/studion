import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";
import Insta from "@/components/Insta";
import Footer from "@/components/Footer";
import About from "@/components/About";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />

      <About />
      <ServicesSection />
      <WorkSection />
      <TestimonialsSection />
      <ContactSection />
      <Insta />
      <Footer />
    </div>
  );
};

export default Index;
