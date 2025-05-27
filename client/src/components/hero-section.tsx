import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="professional-gradient text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
                Professional Tools & Equipment for Every Project
              </h2>
              <p className="text-lg lg:text-xl mb-8 text-blue-100 leading-relaxed max-w-lg">
                From power tools to building materials, we supply everything construction professionals need. 
                Special bulk pricing for contractors and large projects.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/products">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-bold px-10 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  Browse Products
                </Button>
              </Link>
              <Link href="/b2b-portal">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/80 text-white hover:bg-white hover:text-purple-900 font-bold px-10 py-4 rounded-xl backdrop-blur-sm bg-white/10 shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Request Bulk Quote
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 max-w-md">
              <div className="text-center glass-effect rounded-lg p-4">
                <div className="text-3xl font-black text-yellow-400">500+</div>
                <div className="text-blue-200 font-semibold text-sm">Products</div>
              </div>
              <div className="text-center glass-effect rounded-lg p-4">
                <div className="text-3xl font-black text-yellow-400">50+</div>
                <div className="text-blue-200 font-semibold text-sm">Contractors</div>
              </div>
              <div className="text-center glass-effect rounded-lg p-4">
                <div className="text-3xl font-black text-yellow-400">24/7</div>
                <div className="text-blue-200 font-semibold text-sm">Support</div>
              </div>
            </div>
          </div>
          <div className="relative lg:justify-self-end">
            <div className="glass-effect rounded-3xl p-6 lg:p-8 transform hover:scale-105 transition-all duration-300">
              <img
                src="/attached_assets/IMG-20250419-WA0021.jpg"
                alt="MAGWARE Professional Tools & Equipment"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-6 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-200">
                <div className="font-black text-xl">Best Prices</div>
                <div className="text-sm font-semibold opacity-80">In Zimbabwe</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
