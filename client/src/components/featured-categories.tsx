import { Link } from "wouter";
import { Drill, Hammer, Wrench, PaintBucket, Zap, Building } from "lucide-react";

const categories = [
  {
    name: "Power Tools",
    icon: Drill,
    href: "/products?category=Power%20Tools",
    gradient: "from-magware-purple to-magware-blue",
    description: "Professional grade power tools"
  },
  {
    name: "Hand Tools", 
    icon: Hammer,
    href: "/products?category=Hand%20Tools",
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
    name: "Paints & Finishes",
    icon: PaintBucket,
    href: "/products?category=Paints%20%26%20Finishes",
    gradient: "from-magware-purple to-magware-blue",
    description: "Premium paints & finishes"
  },
  {
    name: "Solar Equipment",
    icon: Zap,
    href: "/products?category=Solar%20Equipment",
    gradient: "from-yellow-500 to-orange-500",
    description: "Solar energy solutions"
  },
  {
    name: "Building Materials",
    icon: Building,
    href: "/products?category=Building%20Materials",
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.name} href={category.href}>
                <div className="group cursor-pointer">
                  <div className={`bg-gradient-to-br ${category.gradient} p-6 rounded-2xl text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden border border-white/20 backdrop-blur-sm`}>
                    {/* Enhanced overlay for better clarity */}
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
                    
                    {/* Clear icon container */}
                    <div className="bg-white/25 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center relative z-10 group-hover:bg-white/35 transition-all duration-300 shadow-lg border border-white/30">
                      <IconComponent className="text-white h-8 w-8 drop-shadow-2xl" />
                    </div>
                    
                    {/* Clear title with better contrast */}
                    <h4 className="text-white font-bold text-base mb-2 relative z-10 drop-shadow-lg text-shadow-lg">
                      {category.name}
                    </h4>
                    
                    {/* Clear description with better readability */}
                    <p className="text-white/90 text-xs mb-3 relative z-10 drop-shadow-md font-medium">
                      {category.description}
                    </p>
                    
                    {/* Clear call to action */}
                    <div className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10 font-bold drop-shadow-lg">
                      Shop Now →
                    </div>
                    
                    {/* Subtle decorative element */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/5 rounded-full transform -translate-x-6 translate-y-6 group-hover:scale-150 transition-transform duration-700"></div>
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
