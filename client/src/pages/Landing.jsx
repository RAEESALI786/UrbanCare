import Hero from "../components/Hero";
import QuickLinksFeature from "../components/QuickLinksFeature";
import ServicesSection from "../components/ServicesSection";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import PromoBannerStack from "../components/PromoBanners";

export default function Landing() {
  return (
    <>
      <Hero />
      <QuickLinksFeature />
      <ServicesSection />
      <HowItWorks />
      <PromoBannerStack/>
      <Testimonials />
    </>
  );
}
