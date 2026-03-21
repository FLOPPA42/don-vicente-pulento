import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Promos from "@/components/Promos";
import MenuSection from "@/components/MenuSection";
import Location from "@/components/Location";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Promos />
      <MenuSection />
      <Location />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
