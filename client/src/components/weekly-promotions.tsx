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
          <h3 className="text-4xl font-bold mb-6 text-white drop-shadow-2xl">This Week's Hot Deals</h3>
          <p className="text-2xl text-white font-semibold drop-shadow-lg">Massive savings on professional tools and building materials</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {promotions.map((promo, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-center shadow-2xl border border-white/30">
              <Badge className={`${promo.discountColor} rounded-full px-6 py-3 inline-block mb-6 font-bold text-lg`}>
                {promo.discount}
              </Badge>
              <h4 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">{promo.title}</h4>
              <p className="text-white text-lg mb-6 font-medium drop-shadow-md">{promo.description}</p>
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
