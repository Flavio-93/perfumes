import Navbar from "@/components/blocks/Navbar";
import HeroSection from "@/components/blocks/HeroSection";
import NovedadesSection from "@/components/blocks/NovedadesSection";
import BrandsSection from "@/components/blocks/BrandsSection";
import BenefitsSection from "@/components/blocks/BenefitsSection";
import AboutSection from "@/components/blocks/AboutSection";
import TestimonialsSection from "@/components/blocks/TestimonialsSection";
import FAQAccordion from "@/components/blocks/FAQAccordion";
import ContactForm from "@/components/blocks/ContactForm";
import Footer from "@/components/blocks/Footer";
import WhatsAppFloating from "@/components/blocks/WhatsAppFloating";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-dark selection:bg-brand-gold/30 selection:text-brand-gold">
      <Navbar />
      <HeroSection />
      <NovedadesSection />
      <BrandsSection />
      <BenefitsSection />
      <AboutSection />
      <TestimonialsSection />
      <FAQAccordion />
      <ContactForm />
      <Footer />
      
      <WhatsAppFloating />
    </main>
  );
}
