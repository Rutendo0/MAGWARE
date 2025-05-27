import { Link } from "wouter";
import { Drill, Hammer, Wrench, PaintBucket, Zap, Building } from "lucide-react";

const categories = [
  {
    name: "Power Tools",
    icon: Drill,
    href: "/products?category=Power Tools",
    gradient: "from-magware-purple to-magware-blue"
  },
  {
    name: "Hand Tools", 
    icon: Hammer,
    href: "/products?category=Hand Tools",
    gradient: "from-magware-blue to-magware-secondary"
  },
  {
    name: "Plumbing",
    icon: Wrench,
    href: "/products?category=Plumbing", 
    gradient: "from-magware-secondary to-magware-purple"
  },
  {
    name: "Paints",
    icon: PaintBucket,
    href: "/products?category=Paints & Finishes",
    gradient: "from-magware-purple to-magware-blue"
  },
  {
    name: "Solar",
    icon: Zap,
    href: "/products?category=Solar Equipment",
    gradient: "from-magware-blue to-magware-secondary"
  },
  {
    name: "Materials",
    icon: Building,
    href: "/products?category=Building Materials",
    gradient: "from-magware-secondary to-magware-purple"
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
                  <div className={`bg-gradient-to-br ${category.gradient} p-8 rounded-2xl text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105`}>
                    <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <IconComponent className="text-white h-8 w-8" />
                    </div>
                    <h4 className="text-white font-bold text-lg">{category.name}</h4>
                    <div className="mt-3 text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Shop Now →
                    </div>
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
