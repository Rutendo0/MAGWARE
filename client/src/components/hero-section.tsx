
import { CheckCircle, Star, Award, Users, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-red-900 to-orange-900 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Star className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-sm font-semibold">5 Star Rated</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Users className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-sm font-semibold">500+ Happy Customers</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Award className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-sm font-semibold">Quality Guaranteed</span>
            </div>
          </div>

          {/* Main Heading - Enhanced Typography */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="block text-white drop-shadow-2xl">Zimbabwe's</span>
            <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
              #1 Hardware Store
            </span>
          </h1>
          
          {/* Enhanced Subheading */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl md:text-2xl lg:text-3xl mb-6 text-gray-100 leading-relaxed font-medium">
              Professional tools, building materials, and solar solutions for contractors and DIY enthusiasts
            </p>
            <p className="text-lg md:text-xl text-orange-200 font-semibold">
              🏆 Trusted by major construction companies including Masimba Holdings
            </p>
          </div>
          
          {/* Enhanced Features List */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
            {[
              { icon: "🔧", title: "Professional Tools", desc: "Premium quality" },
              { icon: "💰", title: "Best Prices", desc: "Competitive rates" },
              { icon: "🚚", title: "Fast Delivery", desc: "Same day available" },
              { icon: "⚡", title: "Solar Solutions", desc: "Complete packages" }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/products">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold px-10 py-6 rounded-2xl text-xl shadow-2xl transform transition-all duration-300 hover:scale-105 border-2 border-orange-400/50">
                Shop Now - Browse 1000+ Products
              </Button>
            </Link>
            
            <Link href="/b2b-portal">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-3 border-white text-white hover:bg-white hover:text-red-600 font-bold px-10 py-6 rounded-2xl text-xl backdrop-blur-sm bg-white/10 transform transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                B2B Portal - Bulk Orders
              </Button>
            </Link>
          </div>
          
          {/* Enhanced Store Information */}
          <div className="bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-lg rounded-3xl border-2 border-white/20 p-8 max-w-4xl mx-auto shadow-2xl">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-3">
                <div className="text-4xl">📍</div>
                <h3 className="text-xl font-bold text-white">Visit Our Store</h3>
                <p className="text-gray-200 font-medium leading-relaxed">
                  Shop 4, Avonlea Shopping Center<br/>
                  <span className="text-orange-300">Next to OK Supermarket</span>
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="text-4xl">📞</div>
                <h3 className="text-xl font-bold text-white">Call Us Now</h3>
                <p className="text-gray-200 font-medium">
                  <span className="text-green-300 font-bold">0779 656 666</span><br/>
                  <span className="text-green-300 font-bold">0776 612 600</span>
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="text-4xl">🕒</div>
                <h3 className="text-xl font-bold text-white">Opening Hours</h3>
                <p className="text-gray-200 font-medium">
                  <span className="text-blue-300">Mon - Sat: 8:00 AM - 6:00 PM</span><br/>
                  <span className="text-orange-300">Sunday: Closed</span>
                </p>
              </div>
            </div>
            
            {/* WhatsApp Quick Contact */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <a 
                href="https://wa.me/263779656666?text=Hi%20MAGWARE%2C%20I%20need%20an%20instant%20quote%20for%20hardware%20items.%20Please%20help%20me%20with%20pricing%20and%20availability."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-xl transform transition-all duration-300 hover:scale-105">
                  💬 WhatsApp Us for Instant Quotes
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
