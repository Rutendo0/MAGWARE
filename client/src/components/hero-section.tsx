import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="magware-gradient text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Professional Tools & Equipment for Every Project
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              From power tools to building materials, we supply everything construction professionals need. 
              Special bulk pricing for contractors and large projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/products">
                <Button 
                  size="lg"
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-semibold px-8"
                >
                  Browse Products
                </Button>
              </Link>
              <Link href="/b2b-portal">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-purple-900 font-semibold px-8"
                >
                  Request Bulk Quote
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-purple-200">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-purple-200">Contractors Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-purple-200">Support</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Professional construction worker using power tools"
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-black p-4 rounded-lg shadow-lg">
                <div className="font-bold text-lg">Cash Back</div>
                <div className="text-sm">On Every Purchase</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
