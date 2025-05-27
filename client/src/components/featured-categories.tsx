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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h3>
          <p className="text-xl text-magware-gray">Find exactly what you need for your next project</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.name} href={category.href}>
                <div className="group cursor-pointer">
                  <div className={`bg-gradient-to-br ${category.gradient} p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}>
                    <IconComponent className="text-white h-8 w-8 mx-auto mb-4" />
                    <h4 className="text-white font-semibold">{category.name}</h4>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
