import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturedCategories from "@/components/featured-categories";
import FeaturedProducts from "@/components/featured-products";
import B2BSection from "@/components/b2b-section";
import SolarPackages from "@/components/solar-packages";
import WeeklyPromotions from "@/components/weekly-promotions";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <B2BSection />
      <SolarPackages />
      <WeeklyPromotions />
      <Testimonials />
      <Footer />
      <CartSidebar />
    </div>
  );
}
