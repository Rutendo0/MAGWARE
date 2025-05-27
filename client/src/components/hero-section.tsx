
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-magware-purple via-blue-900 to-magware-blue overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Professional
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Hardware Solutions
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Your trusted partner for quality tools, materials, and professional equipment. 
            From power tools to solar solutions - we've got everything you need to build success.
          </p>
          
          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              "Professional Grade Tools",
              "Competitive Pricing",
              "Expert Guidance",
              "B2B Solutions"
            ].map((feature, index) => (
              <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <CheckCircle className="h-5 w-5 mr-3 text-green-400" />
                <span className="font-semibold">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-magware-purple hover:bg-gray-100 font-bold px-8 py-4 rounded-xl text-lg shadow-2xl transform transition-all duration-300 hover:scale-105">
                Shop Now
              </Button>
            </Link>
            
            <Link href="/b2b-portal">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-magware-purple font-bold px-8 py-4 rounded-xl text-lg backdrop-blur-sm bg-white/10 transform transition-all duration-300 hover:scale-105"
              >
                B2B Portal
              </Button>
            </Link>
          </div>
          
          {/* Contact Info */}
          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Visit Our Store</h3>
            <p className="text-gray-200 mb-2">📍 Shop 4, Avonlea Shopping Center</p>
            <p className="text-gray-200 mb-2">📞 0779 656 666 | 0776 612 600</p>
            <p className="text-gray-200">🕒 Monday - Saturday: 8:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}
