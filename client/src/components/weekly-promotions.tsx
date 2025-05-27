import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const promotions = [
  {
    discount: "30% OFF",
    discountColor: "bg-yellow-500 text-black",
    title: "All Power Tools",
    description: "Wadfow, Total, and premium tool brands",
    cta: "Shop Now"
  },
  {
    discount: "FREE DELIVERY",
    discountColor: "bg-green-500 text-white",
    title: "Orders Over $200",
    description: "Free same-day delivery in Harare",
    cta: "Learn More"
  },
  {
    discount: "CASH BACK",
    discountColor: "bg-red-500 text-white",
    title: "Refer & Earn",
    description: "5% cash back on every referral purchase",
    cta: "Refer Now"
  }
];

export default function WeeklyPromotions() {
  const { toast } = useToast();

  const handlePromotionClick = (title: string) => {
    toast({
      title: "Promotion Available",
      description: `Contact us for details about the ${title} promotion.`,
    });
  };

  return (
    <section className="py-16 magware-gradient text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">This Week's Promotions</h3>
          <p className="text-xl text-purple-100">Limited time offers on essential tools and materials</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {promotions.map((promo, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Badge className={`${promo.discountColor} rounded-full px-4 py-2 inline-block mb-4 font-bold`}>
                {promo.discount}
              </Badge>
              <h4 className="text-xl font-bold mb-2">{promo.title}</h4>
              <p className="text-purple-100 mb-4">{promo.description}</p>
              <Button
                onClick={() => handlePromotionClick(promo.title)}
                className="bg-white text-magware-purple hover:bg-gray-100 font-semibold"
              >
                {promo.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
