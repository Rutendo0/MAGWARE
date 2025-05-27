import { Link } from "wouter";
import { Drill, Hammer, Wrench, PaintBucket, Zap, Building } from "lucide-react";

const categories = [
  {
    name: "Power Tools",
    icon: Drill,
    href: "/products?category=Power+Tools",
    gradient: "from-magware-purple to-magware-blue",
    description: "Professional grade power tools"
  },
  {
    name: "Hand Tools", 
    icon: Hammer,
    href: "/products?category=Hand+Tools",
    gradient: "from-magware-blue to-purple-600",
    description: "Quality hand tools & equipment"
  },
  {
    name: "Plumbing",
    icon: Wrench,
    href: "/products?category=Plumbing", 
    gradient: "from-blue-600 to-magware-purple",
    description: "Complete plumbing solutions"
  },
  {
    name: "Paints",
    icon: PaintBucket,
    href: "/products?category=Paints+%26+Finishes",
    gradient: "from-magware-purple to-magware-blue",
    description: "Premium paints & finishes"
  },
  {
    name: "Solar",
    icon: Zap,
    href: "/products?category=Solar+Equipment",
    gradient: "from-yellow-500 to-orange-500",
    description: "Solar energy solutions"
  },
  {
    name: "Materials",
    icon: Building,
    href: "/products?category=Building+Materials",
    gradient: "from-gray-600 to-magware-purple",
    description: "Construction materials"
  }
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-6">Shop by Category</h3>
          <p className="text-xl text-magware-gray max-w-2xl mx-auto">
            Browse our comprehensive selection of professional tools and materials organized by category
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.name} href={category.href}>
                <div className="group cursor-pointer">
                  <div className={`bg-gradient-to-br ${category.gradient} p-8 rounded-3xl text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                    <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center relative z-10 group-hover:bg-white/30 transition-colors duration-300">
                      <IconComponent className="text-white h-8 w-8 drop-shadow-lg" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2 relative z-10">{category.name}</h4>
                    <p className="text-white/70 text-xs mb-3 relative z-10">{category.description}</p>
                    <div className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10 font-semibold">
                      Shop Now →
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 rounded-full transform translate-x-10 translate-y-10 group-hover:scale-150 transition-transform duration-500"></div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link href="/products">
            <button className="bg-magware-purple hover:bg-magware-purple-dark text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              View All Categories
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
