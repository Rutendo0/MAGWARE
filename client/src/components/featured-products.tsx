import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Heart } from "lucide-react";

export default function FeaturedProducts() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["/api/products/featured"],
  });

  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (productId: number, productName: string) => {
    try {
      await addToCart(productId, 1);
      toast({
        title: "Added to cart",
        description: `${productName} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h3>
            <p className="text-xl text-magware-gray">Professional-grade tools and equipment</p>
          </div>
          <Link href="/products">
            <Button className="bg-magware-purple hover:bg-magware-purple-dark">
              View All Products
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 mb-2"></div>
                  <div className="h-3 bg-gray-200 mb-4"></div>
                  <div className="h-8 bg-gray-200"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <Card key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src={product.imageUrl || "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.featured && (
                    <Badge className="absolute top-4 left-4 bg-magware-purple text-white">
                      Featured
                    </Badge>
                  )}
                  {product.inStock && (
                    <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                      In Stock
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                  <p className="text-magware-gray text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-magware-purple">
                      ${product.price}
                    </div>
                    {product.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleAddToCart(product.id, product.name)}
                      className="flex-1 bg-magware-purple hover:bg-magware-purple-dark"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-magware-purple text-magware-purple hover:bg-magware-purple hover:text-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
