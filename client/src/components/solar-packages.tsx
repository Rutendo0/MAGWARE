import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

export default function SolarPackages() {
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["/api/solar-packages"],
  });

  const { toast } = useToast();

  const handleOrderPackage = (packageName: string) => {
    toast({
      title: "Package Selected",
      description: `Please contact us to order the ${packageName}. Installation consultation included.`,
    });
  };

  const getPackageColor = (index: number) => {
    const colors = [
      "from-yellow-50 to-orange-50 border-yellow-200",
      "from-blue-50 to-purple-50 border-magware-purple", 
      "from-green-50 to-teal-50 border-green-200",
      "from-purple-50 to-pink-50 border-purple-200"
    ];
    return colors[index % colors.length];
  };

  const getPackageNumber = (index: number) => {
    const numbers = [
      { bg: "bg-yellow-500", text: "text-black" },
      { bg: "bg-magware-purple", text: "text-white" },
      { bg: "bg-green-500", text: "text-white" },
      { bg: "bg-purple-500", text: "text-white" }
    ];
    return numbers[index % numbers.length];
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Solar Equipment & Installation Packages</h3>
          <p className="text-xl text-magware-gray">Complete solar solutions with professional installation</p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-6 animate-pulse">
                <div className="h-40 bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 mb-2"></div>
                <div className="h-3 bg-gray-200"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg: any, index: number) => {
              const colorClass = getPackageColor(index);
              const numberStyle = getPackageNumber(index);
              
              return (
                <div key={pkg.id} className={`bg-gradient-to-br ${colorClass} rounded-xl p-6 border-2 hover:border-magware-purple transition-colors relative`}>
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-magware-purple text-white">
                      Popular
                    </Badge>
                  )}
                  
                  <div className={`text-center mb-6 ${pkg.popular ? 'mt-4' : ''}`}>
                    <div className={`${numberStyle.bg} ${numberStyle.text} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold`}>
                      {index + 1}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                    <div className="text-3xl font-bold text-magware-purple">USD${pkg.price}</div>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-gray-700 mb-6">
                    {pkg.components?.map((component: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="text-green-500 mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>{component}</span>
                      </li>
                    ))}
                    <li className="flex items-start">
                      <CheckCircle className="text-green-500 mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>Powers: {pkg.suitable?.join(", ")}</span>
                    </li>
                  </ul>
                  
                  <Button
                    onClick={() => handleOrderPackage(pkg.name)}
                    className="w-full bg-magware-purple hover:bg-magware-purple-dark text-white font-semibold"
                  >
                    Order Package
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-lg text-magware-gray mb-6">All packages include professional installation and 1-year warranty</p>
          <Button 
            size="lg"
            className="bg-yellow-500 text-black hover:bg-yellow-400 font-semibold px-8"
            onClick={() => toast({
              title: "Site Assessment",
              description: "Please contact us at 0779 656 666 to schedule your free site assessment.",
            })}
          >
            Schedule Free Site Assessment
          </Button>
        </div>
      </div>
    </section>
  );
}
