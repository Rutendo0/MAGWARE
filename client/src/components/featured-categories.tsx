import { Link } from "wouter";
import { Drill, Hammer, Wrench, PaintBucket, Zap, Building, ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Power Tools",
    icon: Drill,
    href: "/products?category=Power%20Tools",
    gradient: "from-red-500 via-red-600 to-red-700",
    description: "Professional grade power tools"
  },
  {
    name: "Hand Tools", 
    icon: Hammer,
    href: "/products?category=Hand%20Tools",
    gradient: "from-green-500 via-green-600 to-emerald-600",
    description: "Quality hand tools & equipment"
  },
  {
    name: "Plumbing",
    icon: Wrench,
    href: "/products?category=Plumbing", 
    gradient: "from-blue-500 via-blue-600 to-indigo-600",
    description: "Complete plumbing solutions"
  },
  {
    name: "Paints & Finishes",
    icon: PaintBucket,
    href: "/products?category=Paints%20%26%20Finishes",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    description: "Premium paints & finishes"
  },
  {
    name: "Solar Equipment",
    icon: Zap,
    href: "/products?category=Solar%20Equipment",
    gradient: "from-yellow-500 via-orange-500 to-amber-600",
    description: "Solar energy solutions"
  },
  {
    name: "Building Materials",
    icon: Building,
    href: "/products?category=Building%20Materials",
    gradient: "from-slate-600 via-slate-700 to-gray-800",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.name} href={category.href}>
                <div className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer border-2 border-white/20 hover:border-white/40"
                     style={{animationDelay: `${index * 0.1}s`}}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-95`}></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>

                  {/* Enhanced decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>

                  <div className="relative z-10 p-8 text-white h-56 flex flex-col justify-between">
                    <div>
                      <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-4 w-fit mb-4 group-hover:bg-white/35 transition-all duration-300 border border-white/30 shadow-xl">
                        <IconComponent className="h-8 w-8 text-white drop-shadow-2xl" />
                      </div>
                      <h4 className="text-2xl font-bold mb-3 drop-shadow-2xl tracking-wide">{category.name}</h4>
                      <p className="text-white/95 font-semibold drop-shadow-xl text-lg leading-relaxed">{category.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-white/95 group-hover:text-white font-bold transition-all duration-300 text-lg">
                        <span className="mr-3">Explore Collection</span>
                        <div className="bg-white/25 rounded-full p-2 group-hover:bg-white/40 transition-all duration-300 border border-white/40">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Quality badge */}
                      <div className="bg-yellow-500/90 text-black px-3 py-1 rounded-full text-xs font-bold border border-yellow-400">
                        QUALITY
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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